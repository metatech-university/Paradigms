class Integer {
   #value: number;

  constructor(value: number) {
    this.#value = value;
  }

  public add(newValue: Integer) {
    this.#value += newValue.get();
    return new Integer(this.#value);
  }

  public div(newValue: Integer) {
    this.#value /= newValue.get();
    return new Integer(this.#value);
  }

  public gt(newValue: Integer) {
    return this.#value > newValue.get();
  }

  public get() {
    return this.#value;
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
