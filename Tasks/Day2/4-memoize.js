"use strict";

// implement memoize

const memoize = (f) => {
  const cache = new Map();
  return (...args) => {
    const serializedArgs = JSON.stringify(args);
    const cached = cache.get(serializedArgs);

    if (cached) {
      return cached;
    }

    const result = f(...args);
    cache.set(serializedArgs, result);
    return result;
  };
};

const fib = memoize((n) => n <= 1 ? n : fib(n - 1) + fib(n - 2));

console.log(fib(10));
console.log(fib(11));
console.log(fib(12));
console.log(fib(10));
