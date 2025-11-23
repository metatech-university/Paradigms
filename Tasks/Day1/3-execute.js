'use strict';

const reader = ({ id }) => ({ id, name: 'marcus', age: 42 });

class Exec {
  #reader = null;
  #logger = null;

  constructor({ reader, logger }) {
    this.#reader = reader;
    this.#logger = logger;
  }

  run(plan, context = {}) {
    if (plan.read) {
      return this.run(plan.then, this.#reader(plan.read));
    }

    if (plan.match) {
      for (const [key, value] of Object.entries(plan.match)) {
        if (context[key] !== value) {
          return this.run(plan.fail, context);
        }

        return this.run(plan.success, context);
      }
    }

    if (plan.effect) {
      if (plan.effect === 'noop') {
        return () => {}
      } else if (plan.effect.log) {
        return () => this.#logger(context[plan.effect.log])
      }
    }
  }
}

new Exec({ reader, logger: console.log }).run(({
  read: { id: 15 },
  then: {
    match: { name: 'marcus' },
    success: { effect: { log: 'age' } },
    fail: { effect: 'noop' },
  },
}))();