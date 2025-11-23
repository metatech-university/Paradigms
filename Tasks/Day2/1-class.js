'use strict';

// Rewrite from OOP with mutable state
// to FP using class-based syntax, immutable instance, method chaining

class Adder {
  #value
  // todo make private in d.ts
  constructor(initial) {
    this.#value = initial;
  }

  static of(value){ 
    return new Adder(value)
  }

  add(x) {
    return Adder.of(this.#value + x);
  }

  valueOf() {
    return this.#value;
  }
}

// const sum1 = new Adder(1).add(9).add(1).add(7);
const sum1 = Adder.of(1).add(9).add(1).add(7);
console.log('Sum:', +sum1);
