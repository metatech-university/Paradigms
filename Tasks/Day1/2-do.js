'use strict';

class DoMonad {
	#value;

	constructor(value) {
		this.#value = value;
	}

	bind(fn) {
		const next = fn(this.#value);
		return new DoMonad(next);
	}

	run() {
		return typeof this.#value === 'function' ? this.#value : () => this.#value;
	}
}

const Do = (value) => new DoMonad(value);

Do({ id: 15 })
  .bind(({ id }) => ({ id, name: 'marcus', age: 42 }))
  .bind(({ name, age }) => (name === 'marcus' ? (log) => log(age) : () => {}))
  .run()(console.log);
