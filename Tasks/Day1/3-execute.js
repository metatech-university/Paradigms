'use strict';

const reader = ({ id }) => ({ id, name: 'marcus', age: 42 });

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

const steps = {
	read: { id: 15 },
	then: {
		match: { name: 'marcus' },
		success: { effect: { type: 'log', key: 'age' } },
		fail: { effect: { type: 'noop' } },
	},
};

class Exec {
	#options;
	#isMatched = false;

	constructor(options) {
		this.#options = options;
	}

	read(read) {
		const user = this.#options.reader(read);
		this.#options.env = { user };
	}

	match(user) {
		this.#isMatched = this.#options.env.user.name === user.name;
	}

	effect(effect) {
		const { type, key } = effect;
		if(type === 'noop') return undefined;
		if(type === 'log') return this.#options.log(this.#options.env.user[key]);
	}

	run(steps) {
		if(steps.read) {
			this.read(steps.read);

			return new Exec(this.#options).run(steps.then);
		}
		if (steps.match) {
			this.match(steps.match);
			const effect = this.#isMatched ? steps.success : steps.fail;

			return new Exec(this.#options).run(effect);
		}

		if (steps.effect) {
			this.effect(steps.effect);
		}
	}
}

const main = new Exec({ reader, log: console.log });
main.run(steps);
