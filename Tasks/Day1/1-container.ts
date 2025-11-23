class Integer {
	readonly #value: number;

	constructor(value: number) {
		if (!Number.isInteger(value)) {
			throw new Error('value not integer');
		}
		this.#value = value;
	}

	add(other: Integer) {
		/**
		 * #private fields can be accessed only inside the class that declares them.
		 * You can access other instances' private fields of the same class inside the class.
		 * Outside the class — they are completely inaccessible.
		 *
		 * That's why other.#value works.
		 */
		return new Integer(this.#value + other.#value);
	}

	div(other: Integer) {
		const division = this.#value / other.#value;
		return new Integer(Math.trunc(division));
	}

	gt(other: Integer) {
		return this.#value > other.#value;
	}

	get() {
		return this.#value;
	}
}

// Usage

const a = new Integer(7);
const b = new Integer(3);

const c = a.add(b);
const d = a.div(b);
if (a.gt(b)) {
  console.log('a > b');
}

console.log(`c = ${c.get()}`);
console.log(`d = ${d.get()}`);
