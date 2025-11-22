"use strict";

function Do(value) {
  return new DoClass(value);
}

class DoClass {
  #value;

  constructor(value) {
    this.#value = value;
    return this;
  }

  bind(fn) {
    const value = fn(this.#value);
    return new DoClass(value);
  }

  run() {
    return this.#value;
  }
}

Do({ id: 15 })
  .bind(({ id }) => ({ id, name: 'marcus', age: 42 }))
  .bind(({ name, age }) => (name === 'marcus' ? (log) => log(age) : () => {}))
  .run()(console.log);
