class Integer {
    constructor(private readonly _value: number) {}

    get value(): number {
        return this._value;
    }

    public add(other: Integer): Integer {
        return new Integer(this.value + other._value);
    }

    public div(other: Integer): Integer {
        if (other._value === 0) {
            throw new Error('Division by zero');
        }
        return new Integer(this.value / other._value);
    }

    public gt(other: Integer): boolean {
        return this.value > other._value;
    }

    public get(): number {
        return this._value;
    }
}

// Usage
const a = new Integer(7);
const b = new Integer(3);

const c = a.add(b);
const d = a.div(b);
if (a.gt(b)) {
  console.log(`a(${a.get()}) > b(${b.get()})`, a.gt(b));
}

console.log(`c = ${c.get()}, c.value = ${c.value}`);
console.log(`d = ${d.get()}, d.value = ${d.value}`);
