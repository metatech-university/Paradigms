"use strict";

// Put implementation here

class Do {
  constructor(struct) {
    this.struct = struct;
    this.queue = [];
  }

  bind(fn) {
    const result = fn(this.struct);

    if (typeof result === "function") {
      this.queue.push(result);
      return this;
    }

    return new Do(result);
  }

  run() {
    return (arg) => {
      for (const callback of this.queue) {
        callback(arg);
      }
    };
  }
}

new Do({ id: 15 })
  .bind(({ id }) => ({ id, name: "marcus", age: 42 }))
  .bind(({ name, age }) => (name === "marcus" ? (log) => log(age) : () => {}))
  .run()(console.log);

// Do({ id: 15 })
//   .bind(({ id }) => ({ id, name: "marcus", age: 42 }))
//   .bind(({ name, age }) => (name === "marcus" ? (log) => log(age) : () => {}))
//   .run()(console.log);
