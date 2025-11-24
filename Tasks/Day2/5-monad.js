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

// Option 1:
const createAdder = (initial) => {
  let monad = Monad.of(initial);
  
  return {
    add(x) {
      monad = monad.map(value => value + x);

      return this;
    },
    valueOf() {
      return monad.chain(value => value);
    },
  };
};

const adder1 = createAdder(1).add(9).add(1).add(7);

console.log('Sum 1:', +adder1);

// Option 2:
const add = (x) => (y) => x + y;
const adder2 = Monad.of(1).map(add(9)).map(add(1)).map(add(7));

console.log('Sum 2:', +adder2.chain(value => value));
