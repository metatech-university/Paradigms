'use strict';

// implement memoize

// const memoize = (f) => f;
const cache = new Map();
const memoize = (f) => (...args) => {
  const key = args.map((arg) => `${arg}:${typeof arg}`).join(';');
  if (cache.has(key)) return cache.get(key);
  const res = f(...args);
  cache.set(key, res);
  return res;
};

const fib = memoize((n) => n <= 1 ? n : fib(n - 1) + fib(n - 2));

console.log(fib(10));
console.dir({cache});
