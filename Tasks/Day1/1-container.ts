class Integer {
  // Put implementation here
  #value: number;

  constructor(value: number) {
    this.throwOnFloat(value);
    this.#value = value;
  }

  public get() {
    return this.#value;
  }

  public add(other: Integer) {
    return new Integer(this.get() + other.get());
  }

  public div(other: Integer) {
    return new Integer(this.get() / other.get());
  }

  public gt(other: Integer) {
    return this.get() > other.get();
  }

  private throwOnFloat(value: number) {
    if (value !== Math.floor(value)) {
      throw new Error("Integer does not allow floats");
    }
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
