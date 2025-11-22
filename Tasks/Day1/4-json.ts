"use strict";

// Rewrite to TypeScript with interface

// class Serializable {
//   toJson() {
//     return JSON.stringify(this);
//   }
// }

interface ISerializable {
  toJson(): string;
}

class User implements ISerializable {
  #id;
  #name;

  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }

  toString() {
    return JSON.stringify({
      id: this.#id,
      name: this.#name,
    });
  }

  toJson() {
    return JSON.parse(this.toString());
  }
}

const user = new User(15, "Marcus");
console.log(user.toString());
console.log(user.toJson());
