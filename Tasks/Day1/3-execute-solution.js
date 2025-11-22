'use strict';

class Exec {
  constructor({ reader, log }) {
    this.reader = reader;
    this.log = log;
  }

  run(plan, env = {}) {
    switch (plan.type) {
      case 'read': {
        const user = this.reader(plan.args);

        return this.run(plan.next, { ...env, user });
      }
      case 'match': {
        const { field, value, next, fail } = plan;
        const ok = env.user && env.user[field] === value;
        const branch = ok ? next : fail;

        if (!branch) return () => {};

        return this.run(branch, env);
      }
      case 'log': {
        return () => this.log(env.user && env.user[plan.field]);
      }
      case 'noop': {
        return () => {};
      }
      default:
        return () => {};
    }
  }
}

const reader = ({ id }) => ({ id, name: 'marcus', age: 42 });

const plan = {
  type: 'read',
  args: { id: 15 },
  next: {
    type: 'match',
    field: 'name',
    value: 'marcus',
    next: {
      type: 'log',
      field: 'age',
    },
    fail: {
      type: 'noop',
    },
  },
};

const main = new Exec({ reader, log: console.log });

main.run(plan)();
