'use strict';

// implement memoize
const defaultKeyBuilder = (...args) => args.join(',')
const keyBuilderTyped = (...args) => args.map(a => `${a.toString()}-${typeof a}`).join(',')

const memoize =
  (fn, keyBuilder = defaultKeyBuilder, cache = {}) =>
    (...rest) => {
      const cacheKey = keyBuilder(...rest)
      return cache.hasOwnProperty(cacheKey)
        ? cache[cacheKey]
        : cache[cacheKey] = fn(...rest)
    }


const fib = memoize((n) => (n <= 1 ? n : fib(n - 1) + fib(n - 2)), keyBuilderTyped);

console.log(fib(10));
