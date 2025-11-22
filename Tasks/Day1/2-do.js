"use strict";

// Put implementation here

function Do(initialValue) {
  const steps = [];

  return {
    bind(cb) {
      steps.push(cb);
      return this;
    },
    run() {
      let nextVal = initialValue;

      for (const cb of steps) {
        nextVal = cb(nextVal);
      }

      return nextVal;
    },
  };
}

Do({ id: 15 })
  .bind(({ id }) => ({ id, name: "marcus", age: 42 }))
  .bind(({ name, age }) => (name === "marcus" ? (log) => log(age) : () => {}))
  .run()(console.log);
