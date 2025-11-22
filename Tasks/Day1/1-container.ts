class Integer {
  value: number;

  constructor(value: number) {
    if (typeof value !== "number" || isNaN(value)) {
      throw new Error("Value must be a number");
    }
    this.value = value;
  }

  add(other: Integer): Integer {
    return new Integer(this.value + other.get());
  }

  div(other: Integer): Integer {
    return new Integer(Math.floor(this.value / other.get()));
  }

  get(): number {
    return this.value;
  }

  gt(other: Integer): boolean {
    const valueOther = other.get();
    return this.value > valueOther;
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
