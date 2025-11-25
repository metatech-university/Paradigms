"use strict";

const reader = ({ id }) => ({ id, name: "marcus", age: 42 });

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

// 1. Rewrite in OOP style
// 2. Improve data structure inconsistence

// const main = new Exec(options);
// main.run(steps);

class Exec {
  #effect = {
    log: (env, key, logger) => logger(env[key]),
    noop: () => () => {},
  };
  #readead = false;

  constructor(options) {
    this.options = options;
  }

  #read(plan) {
    this.#readead = true;
    const user = this.options.reader(plan.read);
    return this.#execute(plan, { user });
  }

  #match(plan, env) {
    const ok = env.user.name === plan.match.name;
    return this.#execute(ok ? plan.success : plan.fail, env);
  }

  #effects(plan, env) {
    if (plan.log) {
      return this.#effect.log(env.user, plan.log, this.options.log);
    }
    if (plan.noop) {
      return this.#effect.noop();
    }
  }

  #execute(plan, env = {}) {
    if (!this.#readead && plan.read) return this.#read(plan);

    if (plan.match) return this.#match(plan, env);

    if (plan.effect) return this.#effects(plan.effect, env);
  }

  run(steps) {
    return this.#execute(steps.then);
  }
}

const main = new Exec({ reader, log: console.log });
main.run({
  then: {
    read: { id: 15 },
    match: { name: "marcus" },
    success: { effect: { log: "age" } },
    fail: { effect: "noop" },
  },
});
