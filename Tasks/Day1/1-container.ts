interface IInteger {
  add(newValue: IInteger): IInteger;
  div(newValue: IInteger): IInteger;
  gt(newValue: IInteger): boolean;
  get(): number;
}

class Integer implements IInteger {
  #value;

  constructor(value: number) {
    this.#value = value;
  }

  add(newValue: Integer) {
    return new Integer(this.#value + newValue.#value);
  }

  div(newValue: Integer) {
    return new Integer(Math.floor(this.#value / newValue.#value));
  }

  gt(newValue: Integer) {
    return this.#value > newValue.#value;
  }

  get() {
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
