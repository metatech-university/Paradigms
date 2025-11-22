'use strict';

// Rewrite to TypeScript with interface

interface Serializable {
  toJson(): string;
}

// class Serializable {
//   toJson() {
//     return JSON.stringify(this);
//   }
// }

class User implements Serializable {
    #id: number;
    #name: string;

    constructor(id: number, name: string) {
        // super();
        this.#id = id;
        this.#name = name;
    }

    toJson(): string {
        return JSON.stringify({id: this.#id, name: this.#name});
    }

    get [Symbol.toStringTag]() {
        return "User";
    }
}

const user = new User(15, 'Marcus');
console.log(user.toString());
console.log(user.toJson());
