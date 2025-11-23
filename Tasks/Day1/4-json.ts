"use strict";

interface Serializable {
  toJson(): string;
  toString(): string;
}

class User implements Serializable {
  #id;
  #name;

  constructor(id: number, name: string) {
    this.#id = id;
    this.#name = name;
  }

  toString(): string {
    return `User(id: ${this.#id}, name: ${this.#name})`;
  }

  toJson(): string {
    return JSON.stringify({ id: this.#id, name: this.#name });
  }
}

const user = new User(15, "Marcus");
console.log(user.toString());
console.log(user.toJson());
