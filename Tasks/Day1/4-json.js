"use strict";

// Rewrite to TypeScript with interface

/*
interface ISerializer {
  toString(): string;
  toJson(): string;
}
*/

class User {
  // interface ISerializer
  #id;
  #name;

  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }

  toString() {
    return `User(id: ${this.#id}, name: ${this.#name})`;
  }

  toJson() {
    return JSON.stringify(this);
  }
}

const user = new User(15, "Marcus");
console.log(user.toString());
console.log(user.toJson());
