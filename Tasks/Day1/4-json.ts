interface ISerializer {
    toString(): string;
    toJson(): string;
}

class User implements ISerializer {
    constructor(private readonly id: number, private readonly name: string) {}

    public toString(): string {
        return `[${this.id}] ${this.name}`;
    }

    public toJson(): string {
        return JSON.stringify({ id: this.id, name: this.name });
    }
}

const user = new User(15, 'Marcus');
console.log(user.toString());
console.log(user.toJson());
