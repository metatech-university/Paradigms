'use strict';

class Exec {
  #reader;
  #log;

  constructor({ reader, log }) {
    this.#reader = reader;
    this.#log = log;
  }

  run(plan, env = {}) {
    if (!plan) return { env };

    const { next, result } = this.#execute(plan, env);

    return this.run(next, { ...env, ...(result ?? {}) });
  }

  #execute(plan, env) {
    switch (plan.type) {
      case 'read':
        return this.#executeRead(plan);
      case 'match':
        return this.#executeMatch(plan, env);
      case 'log':
        return this.#executeLog(plan, env);
      case 'noop':
        return this.#executeNoop();
      default:
        throw new Error(`Unknown action type: ${plan.type}`);
    }
  }

  #executeRead(plan) {
    const user = this.#reader(plan.params);

    return { next: plan.next, result: { user } };
  }

  #executeMatch(plan, env) {
    const { field, value } = plan.params;
    const ok = env.user?.[field] === value;
    const next = ok ? plan.next : plan.fail;

    return { next, result: {} };
  }

  #executeLog(plan, env) {
    this.#log(env.user?.[plan.params.field]);

    return { next: plan.next, result: {} };
  }

  #executeNoop() {
    return { next: null, result: {} };
  }
}

const reader = ({ id }) => ({ id, name: 'marcus', age: 42 });

const plan = {
  type: 'read',
  params: { id: 15 },
  next: {
    type: 'match',
    params: { field: 'name', value: 'marcus' },
    next: {
      type: 'log',
      params: { field: 'age' },
    },
    fail: { type: 'noop' },
  },
};

const main = new Exec({ reader, log: console.log });

main.run(plan);
