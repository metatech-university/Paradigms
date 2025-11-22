class Integer {
  #value;

  constructor(value: number) {
    this.#value = value;
  }

  add(delta: Integer): Integer {
    return new Integer(this.get() + delta.get())
  }

  div(delta: Integer): Integer {
    return new Integer(this.get() / delta.get())
  }
  
  get() {
    return this.#value
  }

  gt(valueB: Integer): boolean {
    return this.get() > valueB.get()
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
