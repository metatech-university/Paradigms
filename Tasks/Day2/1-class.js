"use strict";

// Rewrite from OOP with mutable state
// to FP using class-based syntax, immutable instance, method chaining

class Adder {
  initial;
  constructor(initial) {
    this.initial = initial;
  }

  add(x) {
    return new Adder(this.initial + x);
  }

  create(initial) {
    return new Adder(initial);
  }

  valueOf() {
    return this.initial;
  }
}

// const sum1 = new Adder(1).add(9).add(1).add(7);
const adder = new Adder();
const sum1 = adder.create(1).add(9).add(1).add(7);

console.log("Sum:", +sum1);
