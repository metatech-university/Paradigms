"use strict";

// Rewrite previous example from OOP with mutable state
// to FP using closure-based syntax, immutable instance, method chaining

const createAdder = (num) => {
  const val = num;
  const add = (addition) => {
    return createAdder(addition + val);
  };

  const valueOf = () => {
    return val;
  };

  return { add, valueOf };
};

// const sum1 = new Adder(1).add(9).add(1).add(7);
const sum1 = createAdder(1).add(9).add(1).add(7);
console.log("Sum:", +sum1);
