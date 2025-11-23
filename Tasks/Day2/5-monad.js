"use strict";

// Rewrite code from examples 1,2,3 using this Monad
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

const get = (value) => value;
const sumMonad = Monad.of((x) => (y) => x + y);

const createAdder = (container) => ({
  add: (value) =>  createAdder(sumMonad.ap(container).ap(Monad.of(value))),
  valueOf: () => container.chain(get),
});

const sum1 = createAdder(Monad.of(1))
  .add(5)
  .add(-2)
console.log(+sum1);
