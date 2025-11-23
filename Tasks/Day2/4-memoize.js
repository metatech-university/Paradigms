'use strict';

// implement memoize
const memoize =
  (fn, cache = {}) =>
   (n) =>
     cache.hasOwnProperty(n)
      ? cache[n]
      : cache[n] = fn(n)

const fib = memoize((n) => (n <= 1 ? n : fib(n - 1) + fib(n - 2)));

console.log(fib(10));
