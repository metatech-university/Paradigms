class Integer {
    #value: number;

    constructor(value: number) {
        this.#value = value;
    }

    add(newValue: Integer): Integer {
        return new Integer(this.#value + newValue.#value);
    }

    div(newValue: Integer): Integer {
        return new Integer(this.#value + newValue.#value);
    }

    get(): number {
        return this.#value;
    }

    gt(newValue: Integer): boolean {
        return this.#value > newValue.#value;
    }
}

// Usage

const a = new Integer(7);
const b = new Integer(3);

const c = a.add(b);
const d = a.div(b);
if (a.gt(b)) {
  console.log('a > b');
}

console.log(`c = ${c.get()}`);
console.log(`d = ${d.get()}`);
