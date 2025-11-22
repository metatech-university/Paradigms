'use strict';

const fs = require('node:fs');

class Future {
  // fn: (reject, resolve) => void
  #fn
  constructor(fn) {
    this.#fn = fn;
  }

  map(mapFn) {
    return new Future((reject, resolve) => {
      this.#fn(reject, (...args) => resolve(mapFn(...args)))
    })
  }

  chain(chainFn){
    return new Future((reject, resolve) => {
      this.#fn(reject, (...args) => {
        chainFn(...args).fork(reject,resolve)
      })
    })
  }

  fork(reject, resolve) {
    this.#fn(reject, resolve)
    return this;
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
    () => {
      console.log('Done')
    },
  );

// Laziness test

// console.log('before creation')
// const lazy = readFuture('5-future.js', 'utf8')
//   .map((text) => {
//     console.log('map')
//     return text.toUpperCase()
//   })
//   .chain((text) => {  
//     console.log('cahin')
//     return writeFuture('future.md', text)
//   }
// )
// console.log('post creation')

// lazy.fork(
//     (error) => console.error('FS error:', error),
//     () => {
//       console.log('Done')
//     },
//   );

// console.log('post fork')
