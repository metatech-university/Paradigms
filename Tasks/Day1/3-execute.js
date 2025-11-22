'use strict';

const reader = ({ id }) => ({ id, name: 'marcus', age: 42, city: 'London' });

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

// execute({
//   read: { id: 15 },
//   then: {
//     match: { name: 'marcus' },
//     success: { effect: { log: 'age' } },
//     fail: { effect: 'noop' },
//   },
// })(reader, console.log)();

// 1. Rewrite in OOP style
// 2. Improve data structure inconsistency


class Exec {
  #reader
  #logger
  #methods
  
  constructor({ reader, logger }) {
    this.#reader = reader
    this.#logger = logger
    this.#methods = Object
      .getOwnPropertyNames(Object.getPrototypeOf(this))
      .filter(name => name !== 'constructor' && !name.startsWith('#'));
  }

  run(actions, lastResult = undefined) {
    if (Array.isArray(actions)) {
      for (const action of actions) {
        lastResult = this.run(action, lastResult);
      }
      return lastResult;
    }
    
    const result = this.applyAction(actions, lastResult);
    
    if (actions.callback) {
      const callbackResult = result;
      const nextAction = callbackResult ? actions.callback.onSuccess : actions.callback.onFail;
      if (nextAction) {
        return this.run(nextAction, result);
      }
    }
    
    return result;
  }

  applyAction(action, lastResult) {
    const { type, args } = action;
    
    if (!type) {
      throw new Error(`No action name provided`);
    }

    if (!this.#methods.includes(type)) {
      throw new Error(`Invalid action name: ${type}`);
    }

    return this[type](args, lastResult);
  }

  read(args) {
    return this.#reader(args);
  }
  
  noop() {
    return undefined;
  }

  log(field, lastResult) {
    if (!lastResult) {
      throw new Error('log action: no previous result available');
    }
    this.#logger(lastResult[field]);
    return lastResult[field];
  }

  match(args, lastResult) {
    if (!lastResult) {
      throw new Error('match action: no previous result available');
    }
    const fields = Object.keys(args);
    const ok = fields.every(fieldName => lastResult[fieldName] === args[fieldName]);

    return ok ? lastResult : false;
  }
}

const main = new Exec({ reader, logger: console.log }); // options: { reader, logger }
const actions = [
  {
    type: 'read',
    args: { id: 15 }
  },
  {
    type: 'match',
    args: { name: 'marcus', city: 'London' },
    callback: {
      onSuccess: {
        type: 'log',
        args: 'age'
      },
      onFail:  {
        type: 'noop'
      },
    }
  },
]
main.run(actions);
