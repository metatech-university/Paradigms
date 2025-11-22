'use strict';

// Put implementation here
class DoSmth {
  constructor() {
    this.binds = [];

    return (value) => {
      this.binds = [];
      this.value = value;
      return this;
    }
  }

  bind(fn) {
    this.binds.push(fn);
    return this;
  }

  run() {
    return (...args) => {
      let result = this.value;
      for (const fn of this.binds) {
        result = fn(result);

        if (typeof result === 'function') {
          result = result(...args);
        }
      }
    };
  }
}

const Do = new DoSmth();

Do({ id: 15 })
  .bind(({ id }) => ({ id, name: 'marcus', age: 42 }))
  .bind(({ name, age }) => (name === 'marcus' ? (log) => log(age) : () => {}))
  .run()(console.log);
