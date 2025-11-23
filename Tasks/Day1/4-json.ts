'use strict';

// Rewrite to TypeScript with interface
interface ISerializable {
	toJson: () => string;
}

class User implements ISerializable {
  #id;
  #name;

  constructor(id: number, name: string) {
    this.#id = id;
    this.#name = name;
  }

	toJson() {
		return JSON.stringify({ id: this.#id, name: this.#name });
	}

	get [Symbol.toStringTag]() {
		return `[${this.#id}] ${JSON.stringify(this.#name)}`;
	}
}

const user = new User(15, 'Marcus');
console.log(user.toString());
console.log(user.toJson());
