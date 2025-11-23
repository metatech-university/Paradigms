class Integer {
  private #value = NaN;

  constructor(value) {
    if (!this.#isValid(value)) {
      throw new Error('value is not an integer');
    }

    this.#value = value;
  }

  private #isValid(value) {
    return Number.isInteger(value)
  }

  public add(integer) {
    this.#value += integer.get();
    return this;
  }

  public div(integer) {
    this.#value += integer.get();
    return this;
  }

  public gt(integer) {
    return this.#value > integer.get();
  }

  public get() {
    return this.#value;
  }
}

const a = new Integer(7);
const b = new Integer(3);

const c = a.add(b);
const d = a.div(b);
if (a.gt(b)) {
  console.log('a > b');
}

console.log(`c = ${c.get()}`);
console.log(`d = ${d.get()}`);
