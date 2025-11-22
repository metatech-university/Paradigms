"use strict";

// const reader = ({ id }) => ({ id, name: "marcus", age: 42 });

// const execute =
//   (plan) =>
//   (reader, log, env = {}) => {
//     if (plan.read) {
//       const user = reader(plan.read);
//       return execute(plan.then)(reader, log, { user });
//     }
//     if (plan.match) {
//       const ok = env.user.name === plan.match.name;
//       return execute(ok ? plan.success : plan.fail)(reader, log, env);
//     }
//     if (plan.effect) {
//       if (plan.effect.log) return () => log(env.user[plan.effect.log]);
//       if (plan.effect === "noop") return () => {};
//     }
//   };

// execute({
//   read: { id: 15 },
//   then: {
//     match: { name: "marcus" },
//     success: { effect: { log: "age" } },
//     fail: { effect: "noop" },
//   },
// })(reader, console.log)();

// --------------------------------------------------------------------

class Reader {
  #queryOptions;

  constructor(queryOptions) {
    this.#queryOptions = queryOptions;
  }

  readData() {
    return { name: "marcus", age: 42, ...this.#queryOptions };
  }
}

class Exec {
  #options;

  constructor(options) {
    this.#options = { ...options };
  }

  run(steps) {
    this.#executeAllSteps(steps);

    if (steps.length === 0 || !steps.every((s) => s.satisfied))
      this.#options.results.failed();
    this.#options.results.success(console.log, this.#options.data.age);
  }

  #executeAllSteps(steps) {
    for (const step of steps) {
      const result = step.action();
      step.satisfied = !!result;
    }
  }
}

const options = Object.freeze({
  data: new Reader({id: 15}).readData(),
  results: {
    success(log, value) {
      log(value);
    },
    failed: () => {},
  },
});

const steps = [
  {
    name: "match",
    action(name) {
      return name === "marcus";
    },
    satisfied: false,
  },
];

const main = new Exec(options);
main.run(steps);

// 1. Rewrite in OOP style
// 2. Improve data structure inconsistence
