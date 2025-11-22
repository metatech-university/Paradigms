'use strict';

const reader = ({ id }) => ({ id, name: 'marcus', age: 42 })

class Executor {
  #plan

  constructor(plan) {
    this.#plan = plan
  }

  execute(reader, log, env = {}) {
    return this._executeSteps([this.#plan], reader, log, env)
  }

  _executeSteps(steps, reader, log, env) {
    for (const step of steps) {
      if (step.type === 'read') {
        const user = reader(step.value)
        env = { ...env, user }
        if (step.next && step.next.length) {
          return this._executeSteps(step.next, reader, log, env)
        }
      } else if (step.type === 'match') {
        const ok = env.user && env.user.name === step.value.name
        const idx = ok ? 0 : 1
        if (step.next && step.next.length > idx) {
          return this._executeSteps([step.next[idx]], reader, log, env)
        }
      } else if (step.type === 'log') {
        return () => log(env.user[step.value])
      } else if (step.type === 'noop') {
        return () => {}
      }
    }
  }
}

const plan = {
  type: 'read',
  value: { id: 15 },
  next: [
    {
      type: 'match',
      value: { name: 'marcus' },
      next: [
        { type: 'log', value: 'age' },
        { type: 'noop' },
      ],
    },
  ],
}

const executor = new Executor(plan);
executor.execute(reader, console.log)();
