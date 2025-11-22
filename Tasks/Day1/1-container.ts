class Integer {
  private value: number;

  constructor(value: number) {
    if (!Number.isInteger(value)) {
      throw new Error(`Value must be an integer, got ${value}`);
    }

    this.value = value;
  }

  add(other: Integer): Integer {
    return new Integer(this.value + other.get());
  }

  div(other: Integer): Integer {
    return new Integer(this.value / other.get());
  }

  gt(other: Integer): boolean {
    return this.value > other.get();
  }

  get(): number {
    return this.value;
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
