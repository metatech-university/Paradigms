'use strict';

// Rewrite previous example from OOP with mutable state
// to FP using closure-based syntax, immutable instance, method chaining

function createAdder(_value) {
  const value = _value;
  return {
    add: a => createAdder(a + value),
    valueOf: () => value
  }
}

// const sum1 = new Adder(1).add(9).add(1).add(7);
const sum1 = createAdder(1).add(9).add(1).add(7);
console.log('Sum:', +sum1);
