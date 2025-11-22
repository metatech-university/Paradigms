interface Serializable {
  toJson(): string;
}

class User implements Serializable {
  private id: number;
  private name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  toJson(): string {
    return JSON.stringify({ id: this.id, name: this.name });
  }

  toString(): string {
    return `User(id=${this.id}, name=${this.name})`;
  }
}

const user = new User(15, 'Marcus');
console.log(user.toString());
console.log(user.toJson());
