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

// const sum1 = createAdder(1).add(9).add(1).add(7);
// console.log('Sum:', +sum1);

const add = (a) => (b) => a + b

// const logSum = Monad.of(console.log.bind(console, 'Sum:'))
const log = Monad
  .of(console.log)


const res = Monad
  .of(1)
  .map(add(9))
  .map(add(1))
  .map(add(7))


log
  .map(fn => fn.bind(console, 'Sum:'))
  .ap(res)

// ------------- Showcase usage of chain

const addMondaic = (a) => (b) => Monad.of(a + b)

const resMon = Monad
  .of(1)
  .chain(addMondaic(9))
  .chain(addMondaic(1))
  .chain(addMondaic(7))


log
  .map(fn => fn.bind(console, 'Sum monadic:'))
  .ap(resMon)

// ------------- Showcase usage of pipe

const pipe = (initialValue, ...args) => args.reduce((acc, fn) => fn(acc), initialValue)

// TODO: move to the monad class
const map = (fn) => (monad) => monad.map(fn)
const chain = (fn) => (monad) => monad.chain(fn)


const resPipe = pipe(
  Monad.of(1),
  map(add(9)),
  map(add(1)),
  map(add(7)),
)

log
  .map(fn => fn.bind(console, 'Sum pipe:'))
  .ap(resPipe)