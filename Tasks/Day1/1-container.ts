class Integer {
  #value: number;

  constructor(value: number) {
    this.#value = value;
  }

  public add(obj: Integer): Integer {
    return new Integer(this.#value + obj.get());
  }

  public div(obj: Integer): Integer {
    return new Integer(this.#value / obj.get());
  }

  public get(): number {
    return this.#value;
  }

  public gt(obj: Integer): boolean {
    return this.#value > obj.get();
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
