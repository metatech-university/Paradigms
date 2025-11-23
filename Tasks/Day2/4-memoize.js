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

const n = 40;

console.time('non-memoized');
const fib = (n) => n <= 1 ? n : fib(n - 1) + fib(n - 2);
console.log(fib(n));
console.timeEnd('non-memoized');

console.log('-------');

console.time('memoized');
const fibM = memoize((n) => n <= 1 ? n : fibM(n - 1) + fibM(n - 2));
console.log(fibM(n));
console.timeEnd('memoized');

// console.dir({cache});
