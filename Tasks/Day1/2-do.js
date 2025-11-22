'use strict';

// Put implementation here
class Do {
  #value

  constructor(value) {
    this.#value = value;
  }

  // static from(value){
  //   return new Do(value)
  // }

  bind(fn) {
    return new Do(fn(this.#value))
  }

  run() {
    return fn => {
      if (typeof this.#value !== 'function') {
        return
      }
      this.#value(fn)
    }
  }

}

new Do({ id: 15 })
  .bind(({ id }) => ({ id, name: 'marcus', age: 42 }))
  .bind(({ name, age }) => (name === 'marcus' ? (log) => log(age) : () => { }))
  .run()(console.log);
