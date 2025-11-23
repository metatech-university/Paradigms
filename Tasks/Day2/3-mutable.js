"use strict";

// Rewrite previous example from OOP with mutable state
// to FP using closure-based syntax, mutable instance, method chaining

const createAdder = (num) => {
  let val = num;
  const adder = {
    add: (addition) => {
      val += addition;
      return adder;
    },

    valueOf: () => {
      return val;
    },
  };

  return adder;
};

// const sum1 = new Adder(1).add(9).add(1).add(7);
const sum1 = createAdder(1).add(9).add(1).add(7);
console.log("Sum:", +sum1);
