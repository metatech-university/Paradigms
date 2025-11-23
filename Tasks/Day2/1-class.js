"use strict";

// Rewrite from OOP with mutable state
// to FP using class-based syntax, immutable instance, method chaining

class Adder {
  #value;

  static create(value) {
    return new Adder(value);
  }

  constructor(value) {
    this.#value = value;
  }

  add(value) {
    return new Adder(this.#value + value);
  }

  valueOf() {
    return this.#value;
  }
}

const sum1 = Adder.create(1).add(9).add(1).add(7);
console.log("Sum:", +sum1);
