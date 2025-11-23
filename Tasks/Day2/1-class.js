'use strict';

// Rewrite from OOP with mutable state
// to FP using class-based syntax, immutable instance, method chaining

class Adder {
  #value;
  constructor(initial) {
    this.#value = initial;
  }

  add(x) {
    return new Adder(this.#value + x);
  }

  valueOf() {
    return this.#value;
  }

  static create(initial) {
    return new Adder(initial);
  }
}

const sum1 = Adder.create(1).add(9).add(1).add(7);
console.log('Sum:', +sum1);
