"use strict";

// Rewrite previous example using this Monad
// do not change code of Monad

class Monad {
  #value;

  constructor(value) {
    this.#value = value;
  }

  static of(value) {
    return new Monad(value);
  }

  map(fn) {
    return Monad.of(fn(this.#value));
  }

  chain(fn) {
    return fn(this.#value);
  }

  ap(container) {
    const fn = this.#value;
    return container.map(fn);
  }
}

const create = (initial) => Monad.of(initial);
const add = (x) => (y) => x + y;
const m0 = create(1);
const m1 = m0.map(add(9));
const m2 = m1.map(add(1));
const m3 = m2.map(add(7));
const sum = m3.chain(console.log);