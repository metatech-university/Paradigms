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

const memoizationMonad = Monad
    .of((cacheMap) => (f) => (...args) => {
      const newCacheMap = new Map(cacheMap);
      const cacheKey = args.map((arg) => `${typeof arg}-${arg.toString()}`).join('|');
      if (!newCacheMap.has(cacheKey)) newCacheMap.set(cacheKey, f(...args))

      return newCacheMap.get(cacheKey)
    })

const memoizedFibonacci = memoizationMonad.ap(Monad.of(new Map())).ap(Monad.of(fib))

memoizedFibonacci.ap(Monad.of(10)).chain(console.log)