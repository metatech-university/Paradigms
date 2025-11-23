'use strict';

// Rewrite previous example using this Monad
// do not change code of Monad

let fib = (n) => (n <= 1 ? n : fib(n - 1) + fib(n - 2))

const memoize =
  (fn, cache = {}) => {

    return (n) =>
      cache.hasOwnProperty(n)
        ? (console.log('cache'), cache[n])
        : cache[n] = fn(n)
  }

class Monad {
  #value;

  constructor(value) {
    this.#value = value;
  }

  static of(value) {
    return new Monad(value);
  }

  map(fn) {
    return Monad.of(fn(this.#value));
  }

  chain(fn) {
    return fn(this.#value);
  }

  ap(container) {
    const fn = this.#value;
    return container.map(fn);
  }
}

const init = Monad.of(10)
const memoFib = Monad.of(memoize).ap(Monad.of(fib))

fib = memoFib.chain((f) => f)

const res = memoFib.ap(init)
res.chain(console.log)
