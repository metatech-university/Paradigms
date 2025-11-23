"use strict";

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

const Adder = {
  create: (initial) => {
    return {
      add: (x) => {
        const sum = initial + x;
        return Adder.create(sum);
      },
      valueOf: () => {
        return initial;
      },
    };
  },
};

const sum1 = Adder.create(1).add(9).add(1).add(7);

console.log("Sum:", +sum1);
