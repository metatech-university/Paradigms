'use strict';

const fs = require('node:fs');

class Future {
  #computation;

  constructor(computation) {
    this.#computation = computation;
  }

  map(fn) {
    return new Future((reject, resolve) =>
      this.fork(
        reject,
        (...args) => {
          try {
            resolve(fn(...args));
          } catch (err) {
            reject(err);
          }
        },
      )
    );
  }

  chain(fn) {
    return new Future((reject, resolve) =>
      this.fork(
        reject,
        (...args) => {
          let next;

          try {
            next = fn(...args);
          } catch (err) {
            return reject(err);
          }

          next.fork(reject, resolve);
        },
      )
    );
  }

  fork(reject, resolve) {
    try {
      return this.#computation(reject, resolve);
    } catch (err) {
      reject(err);
    }
  }
}

const futurify = (fn) =>
  (...args) =>
    new Future((reject, resolve) =>
      fn(...args, (error, result) =>
        error ? reject(error) : resolve(result),
      ),
    );

const readFuture = futurify(fs.readFile);
const writeFuture = futurify(fs.writeFile);

readFuture('future.js', 'utf8')
  .map((text) => text.toUpperCase())
  .chain((text) => writeFuture('future.md', text))
  .fork(
    (error) => console.error('FS error:', error),
    () => console.log('Done'),
  );
