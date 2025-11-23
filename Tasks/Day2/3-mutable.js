'use strict';

// Rewrite previous example from OOP with mutable state
// to FP using closure-based syntax, mutable instance, method chaining

function createAdder(_value) {
  let value = _value;
  const adder = {
    add: a => {
      value += a;
      return adder
    },
    valueOf: () => value
  }
  return adder;
}

// const sum1 = new Adder(1).add(9).add(1).add(7);
const sum1 = createAdder(1).add(9).add(1).add(7);
console.log('Sum:', +sum1);
