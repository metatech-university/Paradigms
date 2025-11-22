class Integer {
  #value: number
  constructor(number: number) {
    if(Number.isInteger(number)) {
      this.#value = number
    } else {
      throw new Error("argument is not integer")
    }
  }

  add(value: Integer) {
    this.#value += value.get()
    return new Integer(this.#value)
  }

  div(value: Integer) {
    this.#value /= value.get()
    return new Integer(Math.trunc(this.#value))
  }

  get() {
    return this.#value
  }

  gt(value: Integer) {
    return this.#value > value.get()
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
