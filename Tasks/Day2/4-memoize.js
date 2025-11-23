"use strict";

// implement memoize
// const memoize = (f) => f;
const useCache = () => {
  const cache = new Map();

  return (fn) => (value) => {
    if (cache.has(value)) {
      return cache.get(value);
    }
    const res = fn(value);
    cache.set(value, res);
    return res;
  };
};

const memoize = useCache();

const fib = memoize((n) => (n <= 1 ? n : fib(n - 1) + fib(n - 2)));

console.log(fib(10));
