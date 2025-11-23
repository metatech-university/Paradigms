'use strict';

// Rewrite to TypeScript with interface

interface Serializable {
  toJson(): string
}

class User implements Serializable {
  private #id: string;
  private #name: string;

  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }

  public toJson(): string {
    return JSON.stringify({ id: this.#id, name: this.#name });
  }
}

const user = new User(15, 'Marcus');
console.log(user.toString());
console.log(user.toJson());
