'use strict';

class DoClass {
  constructor(thunk) {
    this.thunk = thunk;
  }

  bind(fn) {
    return new DoClass(() => fn(this.thunk()));
  }

  run() {
    return this.thunk();
  }
}

const Do = (value) =>
  new DoClass(typeof value === 'function' ? value : () => value);

Do({ id: 15 })
  .bind(({ id }) => ({ id, name: 'marcus', age: 42 }))
  .bind(({ name, age }) => (name === 'marcus' ? (log) => log(age) : () => {}))
  .run()(console.log);
