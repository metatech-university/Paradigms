'use strict';

// Rewrite previous example from OOP with mutable state
// to FP using closure-based syntax, mutable instance, method chaining

const createAdder = (init) => {
  let mutaValue = init
  const add =  ({
    add: (x) => { mutaValue += x; return add },
    valueOf: () => mutaValue
  })
  return add
}

// const sum1 = new Adder(1).add(9).add(1).add(7);
const sum1 = createAdder(1).add(9).add(1).add(7);
console.log('Sum:', +sum1);
