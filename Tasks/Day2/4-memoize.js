'use strict';

// implement memoize
const defaultKeyBuilder = (...args) => args.join(',')

const memoize = (f, keyBuilder = defaultKeyBuilder) => {
    const cache = new Map();
    return (...args) => {
        const key = keyBuilder(...args)
        if (cache.get(key) == null) {
            // console.log(`calculate: ${key}`);
            const res = f(...args)
            cache.set(key, res)
        } // else {
        //     console.log(`cache hit: ${key}`);
        // }
        return cache.get(key);
    }
};

const fib = memoize((n) => n <= 1 ? n : fib(n - 1) + fib(n - 2));

console.log(fib(10));
