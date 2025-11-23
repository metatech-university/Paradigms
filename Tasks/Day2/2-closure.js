'use strict';

// Rewrite previous example from OOP with mutable state
// to FP using closure-based syntax, immutable instance, method chaining

const createAdder = (initial) => ({
  add: (x) => createAdder(initial + x),
  valueOf: () => initial,
});

const sum1 = createAdder(1).add(9).add(1).add(7);
console.log('Sum:', +sum1);
