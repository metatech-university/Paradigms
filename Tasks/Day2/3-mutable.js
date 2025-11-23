'use strict';

// Rewrite previous example from OOP with mutable state
// to FP using closure-based syntax, mutable instance, method chaining

const createAdder = (initial) => {
  let value = initial;

  const instance =  {
    add(x) {
      value = value + x;
      return instance;
    },
    valueOf() {
      return value;
    },
  };

  return instance;
};

const sum1 = createAdder(1).add(9).add(1).add(7);
console.log('Sum:', +sum1);
