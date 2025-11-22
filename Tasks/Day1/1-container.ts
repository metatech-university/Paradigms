class Integer {
  #value: number;

  constructor(value: number) {
    this.#value = value;
  }

  add(other: Integer): Integer {
    return new Integer(this.#value + other.#value);
  }

  div(other: Integer): Integer {
    return new Integer(this.#value / other.#value);
  }

  gt(other: Integer): boolean {
    return this.#value > other.#value;
  }

  get(): number {
    return this.#value;
  }
}

// Usage

const a = new Integer(7);
const b = new Integer(3);

const c = a.add(b);
const d = a.div(b);
if (a.gt(b)) {
  console.log("a > b");
}

console.log(`c = ${c.get()}`);
console.log(`d = ${d.get()}`);
