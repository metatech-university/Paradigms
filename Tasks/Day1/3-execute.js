'use strict';

const reader = ({ id }) => ({ id, name: 'marcus', age: 42 });

// const execute = (plan) => (reader, log, env = {}) => {
//   if (plan.read) {
//     const user = reader(plan.read);
//     return execute(plan.then)(reader, log, { user });
//   }
//   if (plan.match) {
//     const ok = env.user.name === plan.match.name;
//     return execute(ok ? plan.success : plan.fail)(reader, log, env);
//   }
//   if (plan.effect) {
//     if (plan.effect.log) return () => log(env.user[plan.effect.log]);
//     if (plan.effect === 'noop') return () => { };
//   }
// };

class Executor {

  #reader
  #logger
  constructor(reader, logger) {
    this.#logger = logger
    this.#reader = reader
  }

  execute(instructions) {
    instructions.reduce((env, instruction) => this.executeIntruction(env, instruction), {})
  }

  executeIntruction(env, instruction) {
    const { type, params, effect } = instruction

    const opEcecutor = this[type].bind(this)
    return opEcecutor === undefined ? env : opEcecutor(env, effect, ...params)
  }

  read(ctx, { fail, success }, param) {
    try {
      const value = this.#reader(param)
      if (success) this.executeIntruction(value, success)

      return value
    } catch (e) {
      if (fail) this.executeIntruction(e, fail)
      return ctx
    }
  }

  match(ctx, { fail, success }, matchParam) {
    const key = Object.keys(matchParam)[0]
    if (!key) return fail()

    if (ctx[key] === matchParam[key]) {
      this.executeIntruction(ctx, success)
      return ctx
    }
    this.executeIntruction(ctx, fail)
  }


  noop() {
  }

  log(ctx, _effects, param) {
    const key = Object.keys(param)[0]
    const val = ctx[key]
    this.#logger(val)
  }

}

const Operation = Object.freeze({
  noop: () => ({ type: 'noop', params: [], effect: {} }),
  log: key => ({ type: 'log', params: [{ [key]: key }], effect: {} }),
  read: ({ params, effect }) => ({ type: 'read', params, effect }),
  match: ({ params, effect }) => ({ type: 'match', params, effect })
})

new Executor(reader, console.log).execute([
  {
    type: 'read',
    params: [{ id: 15 }],
    effect: { fail: Operation.noop(), success: Operation.log('name') }
  },
  {
    type: 'match',
    params: [{ name: 'marcus' }],
    effect: { fail: Operation.noop(), success: Operation.log('age') }
  }
]);

