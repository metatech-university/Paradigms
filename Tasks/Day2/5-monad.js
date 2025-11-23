'use strict';

// Rewrite previous example using this Monad
// do not change code of Monad

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

const fib = (n) => n <= 1 ? n : fib(n - 1) + fib(n - 2);

const memoize = (f) => {
  const cacheMap = new Map()

  return (...args) => {
    const cacheKey = args.map((arg) => `${typeof arg}-${arg.toString()}`).join('|');
    if (!cacheMap.has(cacheKey)) cacheMap.set(cacheKey, f(...args))

    return cacheMap.get(cacheKey)
  }
};

console.log(Monad.of(fib).chain(memoize)(10));