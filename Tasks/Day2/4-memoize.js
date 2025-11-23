'use strict';

// implement memoize
const memoize = (fn) => {
    const cache = new Map();

    return (arg) => {
        if (!cache.has(arg)) cache.set(arg, fn(arg));
        return cache.get(arg);
    }
};

const fib = memoize((n) => n <= 1 ? n : fib(n - 1) + fib(n - 2));

console.log(fib(10));
