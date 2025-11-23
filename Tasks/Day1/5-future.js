'use strict';

const fs = require('node:fs');

class Future {
    #callback = () => undefined;

    constructor(callback) {
        this.#callback = callback;
    }

    fork(onerror, onsuccess) {
        this.#callback(onerror, onsuccess);
    }

    chain(callback) {
        return new Future((reject, resolve) => {
            this.#callback(reject, (value) => {
                try {
                    callback(value).fork(reject, resolve)
                } catch (error) {
                    reject(error)
                }
            })
        });
    }

    map(callback) {
        return new Future((reject, resolve) => {
            this.#callback(reject, (value) => {
                try {
                    resolve(callback(value))
                } catch (error) {
                    reject(error)
                }
            })
        });
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

readFuture('5-future.js', 'utf8')
    .map((text) => text.toUpperCase())
    .chain((text) => writeFuture('future.md', text))
    .fork(
        (error) => console.error('FS error:', error),
        () => console.log('Done'),
    );