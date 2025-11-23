"use strict";

// implement memoize
// const memoize = (f) => f;
const cacheKey = (args) =>
  args.map((a) => (typeof a === "object" ? JSON.stringify(a) : a)).join("|");

const useCache = () => {
  const cache = new Map();

  return (fn) =>
    (...args) => {
      const key = cacheKey(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const res = fn(...args);
      cache.set(key, res);
      return res;
    };
};

const memoize = useCache();

const fib = memoize((n) => (n <= 1 ? n : fib(n - 1) + fib(n - 2)));

console.log(fib(10));
