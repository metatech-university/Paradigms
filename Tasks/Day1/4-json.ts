'use strict';

// Rewrite to TypeScript with interface

interface Serializable {
  toJson: () => string
}

class User implements Serializable {
  #id;
  #name;

  constructor(id: number, name: string) {
    this.#id = id;
    this.#name = name;
  }

  toJson(){
    return JSON.stringify({id: this.#id, name: this.#name})
  }
}

const user = new User(15, 'Marcus');
console.log(user.toString());
console.log(user.toJson());
