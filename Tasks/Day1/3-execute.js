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

execute({
  read: { id: 15 },
  then: {
    match: { name: "marcus" },
    success: { effect: { log: "age" } },
    fail: { effect: "noop" },
  },
})(reader, console.log)();

// 1. Rewrite in OOP style
// 2. Improve data structure inconsistence

class Exec {
  #options;

  constructor(options) {
    this.#options = options;
  }

  run(steps) {
    return new InnerExec(this.#options, steps).run(steps);
  }
}

class InnerExec {
  #allSteps;
  #options;

  constructor(options, allSteps) {
    this.#options = options;
    this.#allSteps = allSteps;
  }

  run(step) {
    if (step.read)
      return new InnerExec(this.#options, this.#allSteps).run(step.read);

    if (step.from) {
      try {
        const user = this.#options.reader(step.from);
        this.#options.env = { user };
        return new InnerExec(
          { ...this.#options, env: { user } },
          this.#allSteps
        ).run(step.success);
      } catch {
        return new InnerExec(this.#options, this.#allSteps).run(step.fail);
      }
    }

    if (step.match) {
      const ok = this.#options.env.user.name === step.match.name;
      return new InnerExec(this.#options).run(ok ? step.success : step.fail);
    }

    if (step.effect.log)
      return this.#options.log(this.#options.env.user[step.effect.log]);

    if (step.effect === "noop") return;

    if (step.effect.next)
      return new InnerExec(this.#options, this.#allSteps).run(
        this.#allSteps[step.effect.next]
      );
  }
}

const options = {
  reader,
  log: console.log,
  env: {},
};

const steps = {
  read: {
    from: { id: 15 },
    success: { effect: { next: "then" } },
    fail: { effect: "noop" },
  },
  then: {
    match: { name: "marcus" },
    success: { effect: { log: "age" } },
    fail: { effect: "noop" },
  },
};

const main = new Exec(options);
main.run(steps);
