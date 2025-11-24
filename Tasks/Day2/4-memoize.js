'use strict';

// implement memoize
const cache = new Map()

const memoize = (f) => (...args) => {
    const key = args.join()
    
    if (cache.has(key)) {
        return cache.get(key)
    } 

    const result = f(...args)
    cache.set(key, result)

    return result
}
const fib = memoize((n) => n <= 1 ? n : fib(n - 1) + fib(n - 2));

console.log(fib(10));
