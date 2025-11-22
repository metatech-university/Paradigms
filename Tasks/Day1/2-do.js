"use strict";

// Put implementation here
class Do {
  constructor(initial) {
    this.initial = initial;
    this.steps = [];
  }

  bind = (fn) => {
    this.steps.push(fn);
    return this;
  };

  run = () => {
    return (log) => {
      this.steps.reduce(
        (acc, step) => {
          const result = step(acc);
          if (typeof result !== "function") return step(acc);
          result(log);
          return acc;
        },
        { ...this.initial }
      );
    };
  };
}

new Do({ id: 15 })
  .bind(({ id }) => ({ id, name: "marcus", age: 42 }))
  .bind(({ name, age }) => (name === "marcus" ? (log) => log(age) : () => {}))
  .run()(console.log);
