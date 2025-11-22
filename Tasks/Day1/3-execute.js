"use strict";

const reader = ({ id }) => ({ id, name: "marcus", age: 42 });

const execute =
  (plan) =>
  (reader, log, env = {}) => {
    if (plan.read) {
      const user = reader(plan.read);
      return execute(plan.then)(reader, log, { user });
    }
    if (plan.match) {
      const ok = env.user.name === plan.match.name;
      return execute(ok ? plan.success : plan.fail)(reader, log, env);
    }
    if (plan.effect) {
      if (plan.effect.log) return () => log(env.user[plan.effect.log]);
      if (plan.effect === "noop") return () => {};
    }
  };

// execute({
//   read: { id: 15 },
//   then: {
//     match: { name: "marcus" },
//     success: { effect: { log: "age" } },
//     fail: { effect: "noop" },
//   },
// })(reader, console.log)();

// 1. Rewrite in OOP style
// 2. Improve data structure inconsistence

class Exec {
  #log;
  #reader;
  constructor({ reader, log }) {
    this.#log = log;
    this.#reader = reader;
  }
  #match(plan, env) {
    for (const [key, value] of Object.entries(plan.match.data)) {
      if (env.user[key] !== value) {
        return this.#execute(plan.match.effect.fail, env);
      }
    }
    return this.#execute(plan.match.effect.success, env);
  }
  #effect(plan, env) {
    if (plan.effect.log) return () => this.#log(env.user[plan.effect.log]);
    if (plan.effect === "noop") return () => {};
  }
  #read(plan) {
    const user = this.#reader(plan.read.data);
    return this.#execute(plan.read.effect, { user });
  }
  #execute(plan, env) {
    if (plan.read) return this.#read(plan);
    if (plan.match && plan.match.data) return this.#match(plan, env);
    if (plan.effect) return this.#effect(plan, env);
    return () => {};
  }
  run(plan) {
    return this.#execute(plan, {});
  }
}
const options = {
  reader,
  log: console.log,
};

const plan = {
  read: {
    data: { id: 15 },
    effect: {
      match: {
        data: { name: "marcus" },
        effect: {
          success: { effect: { log: "age" } },
          fail: { effect: "noop" },
        },
      },
    },
  },
};

const main = new Exec(options); // options: {log, reader }
const result = main.run(plan);
result();
