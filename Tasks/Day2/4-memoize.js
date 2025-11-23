'use strict';

// implement memoize
const defaultKeyBuilder = (...args) => args.join(',')
const keyBuilderWithTypes = (...args) => args.map(a => `${a.toString()}-${typeof a}`).join(',')

const memoize = (f, keyBuilder = defaultKeyBuilder) => {
    const cache = new Map();
    return (...args) => {
        const key = keyBuilder(...args)
        if (cache.get(key) == null) {
            const res = f(...args)
            cache.set(key, res)
        }
        return cache.get(key);
    }
};

const fib = memoize((n) => n <= 1 ? n : fib(n - 1) + fib(n - 2), keyBuilderWithTypes);

console.log(fib(10));
