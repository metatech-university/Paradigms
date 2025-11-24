'use strict';

// Rewrite previous example from OOP with mutable state
// to FP using closure-based syntax, immutable instance, method chaining

// class Adder {
//   constructor(initial) {
//     this.value = initial;
//   }

//   add(x) {
//     this.value += x;
//     return this;
//   }

//   valueOf() {
//     return this.value;
//   }
// }

const createAdder = (init) => {
  let value = init

  const add = (x) => createAdder(value + x)
  const valueOf = () => value

  return { add, valueOf }
}

// const sum1 = new Adder(1).add(9).add(1).add(7);
const sum1 = createAdder(1).add(9).add(1).add(7);
console.log('Sum:', +sum1);
