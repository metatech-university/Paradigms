'use strict';

// Put implementation here
class Do {
  #data;
  #order = [];
  constructor(data) {
    this.#data = data; 
  }

  bind(fn) {
    this.#order.push(fn);
    return this;
  }

  run() {
    return this.#order.reduce((data, fn) => fn(data), this.#data);
  }
}

new Do({ id: 15 })
  .bind(({ id }) => ({ id, name: 'marcus', age: 42 }))
  .bind(({ name, age }) => (name === 'marcus' ? (log) => log(age) : () => {}))
  .run()(console.log);


