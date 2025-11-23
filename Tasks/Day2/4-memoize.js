'use strict';

// implement memoize

const memoize = (f) => {
  const cache = new Map();

  return (x) => {
    if (cache.has(x)) return cache.get(x);
    const result = f(x);
    cache.set(x, result);
    return result;
  };
};

const fib = memoize((n) => n <= 1 ? n : fib(n - 1) + fib(n - 2));

console.log(fib(10));
