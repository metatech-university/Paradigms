'use strict';


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

// Rewrite from OOP with mutable state
// to FP using class-based syntax, immutable instance, method chaining

const Adder = {
  create: (value) => ({
    add: (x) => Adder.create(value + x),
    valueOf: () => value
  })
}

const sum1 = Adder.create(1).add(9).add(1).add(7);
console.log('Sum:', +sum1);
