"use strict";

// must evaluate lazy
class DoImplementation {
  #params = [];
  #tasks = [];

  constructor(initialParams = {}) {
    this.#params.push(initialParams);
  }

  bind(taskExecutor) {
    this.#tasks.push((cb) => {
      const result = taskExecutor(this.#params.pop());
      if (typeof result === "function") {
        result(cb);
      } else {
        this.#params.push(result);
      }
    });

    return this;
  }

  run() {
    return (cb) => {
      this.#tasks.forEach((task) => task(cb));
    };
  }
}

function Do(initialParams = {}) {
  return new DoImplementation(initialParams);
}

// Put implementation here

Do({ id: 15 })
  .bind(({ id }) => ({ id, name: "marcus", age: 42 }))
  .bind(({ name, age }) => (name === "marcus" ? (log) => log(age) : () => {}))
  .run()(console.log);
