'use strict';

const reader = ({ id }) => ({ id, name: 'marcus', age: 42 });
const log = console.log;

const execute = (plan) => (reader, log, env = {}) => {
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
    if (plan.effect === 'noop') return () => {};
  }
};

execute({
  read: { id: 15 },
  then: {
    match: { name: 'marcus' },
    success: { effect: { log: 'age' } },
    fail: { effect: 'noop' },
  },
})(reader, console.log)();

const options = { reader, log };

const steps = {
  read: { id: 15 },
  then: {
    match: { name: "marcus" },
    success: { effect: { type: "log", field: "age" } },
    fail: { effect: { type: "noop" } },
  },
};

class Exec {
  #reader;
  #log;

  #effects = {
    noop: () => {},
    log: (effect, user) => this.#log(user[effect.field]),
  };

  constructor(options) {
    this.#reader = options.reader;
    this.#log = options.log;
  }

  run(steps) {
    let user;

    if (!steps.read) {
      return;
    }

    user = this.#reader(steps.read);
    const isMatch = this.match(user, steps.then.match);
    const effect = isMatch ? steps.then.success?.effect : steps.then.fail?.effect;

    if (!effect) {
      return;
    }

    this.effect(effect, user);
  }

  match(user, match) {
    return user.name === match.name;
  }

  effect(effect, user) {
    this.#effects[effect.type](effect, user);
  }
}

// 1. Rewrite in OOP style
// 2. Improve data structure inconsistence

const main = new Exec(options);
main.run(steps);
