// Rewrite to TypeScript with interface
interface Serializable {
  toJson: () => string;
}

class User implements Serializable {
  #id: number;
  #name: string;

  constructor(id: number, name: string) {
    this.#id = id;
    this.#name = name;
  }

  toJson(): string {
    return JSON.stringify({ id: this.#id, name: this.#name })
  };

  get [Symbol.toStringTag](): string {
    return "User"
  }
}

const user = new User(15, 'Marcus');
console.log(user.toString());
console.log(user.toJson());
