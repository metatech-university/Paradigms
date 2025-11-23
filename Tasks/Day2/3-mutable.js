"use strict";

// Rewrite previous example from OOP with mutable state
// to FP using closure-based syntax, mutable instance, method chaining

const createAdder = (value) => {
  let state = value;

  const adder = {
    add: (num) => {
      state += num;
      return adder;
    },
    valueOf: () => state,
  };

  return adder;
};

const sum1 = createAdder(1).add(9).add(1).add(7);
console.log("Sum:", +sum1);
