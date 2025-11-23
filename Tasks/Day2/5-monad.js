'use strict';

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

const add = (value) => (monadValue) => monadValue + value;
const valueOf = (monadValue) => monadValue;

const sum1 = Monad.of(1)
  .map(add(9))
  .map(add(1))
  .map(add(7))
  .chain(valueOf);

console.log('Sum:', sum1);
