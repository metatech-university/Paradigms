'use strict';

const reader = ({id}) => ({id, name: 'marcus', age: 42});

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

// 1. Rewrite in OOP style
// 2. Improve data structure inconsistence

/**
 * Exec orchestrates plan execution.
 *
 * @class
 * @property {(input: any) => any} reader
 * @property {(msg: any) => void} log
 */
class Exec {
    constructor(options) {
        Object.assign(this, options);
        return this;
    }

    run(plan, data = {}) {
        if (plan.type === 'read') {
            return this.run(plan.next, this.reader(plan.value));
        }
        if (plan.type === 'match') {
            const success = plan.value.name === data.name;
            return this.run(success ? plan.next[0] : plan.next[1], data);
        }
        if (plan.type === 'log') {
            return this.log(data[plan.value]);
        }
        if (plan.type === 'noop') {
            return;
        }

        throw new Error('Unknown plan type');
    }
}

const main = new Exec({
    reader,
    log: console.log,
});
main.run({
    type: 'read',
    value: {id: 15},
    next: {
        type: 'match',
        value: {name: 'marcus'},
        next: [{type: 'log', value: 'age'}, {type: 'noop'}]
    },
});
