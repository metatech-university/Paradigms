"use strict";

// Rewrite to TypeScript with interface

interface ISerializable {
  toJson(): string;
  toString(): string;
}

class Serializable {
  toJson() {
    return JSON.stringify(this);
  }
}

class User implements ISerializable {
  readonly id: number;
  readonly name: string;
  toJson: () => string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.toJson = new Serializable().toJson.bind(this);
  }
}

const user = new User(15, "Marcus");
console.log(user.toString());
console.log(user.toJson());
