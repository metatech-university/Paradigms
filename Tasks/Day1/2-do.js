'use strict'

// Put implementation here

class Do {
  #steps = []
  constructor(state, steps) {
    this.initialState = state
    this.#steps = steps ?? []
  }

  bind(fn) {
    this.#steps.push(fn)
    return new Do(this.initialState, this.#steps)
  }

  run() {
    return (log) => {
      let current = this.initialState
      for(const fn of this.#steps) {
        const res = fn(current)
        current = typeof res === 'function' ? res(log) : res
      }
    }
  }
}

new Do({ id: 15 })
  .bind(({ id }) => ({ id, name: 'marcus', age: 42 }))
  .bind(({ name, age }) => (name === 'marcus' ? (log) => log(age) : () => {}))
  .run()(console.log)
