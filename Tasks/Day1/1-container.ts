type Payload<T extends Numeric = Numeric> = T;

class Numeric {
  private readonly value: number;
  constructor(value: number) {
    this.value = value;
  }

  get() {
    return this.value;
  }
}

class Integer extends Numeric{
  constructor(value: number) {
    super(value);
    this.assert(value);
  }

  private assert(value: number): void {
    if (!Number.isInteger(value)) {
      throw new Error('Value must be an integer');
    }
  }

  private pack(value: number) {
    try {
      return new Integer(value);
    } catch {
      return new Numeric(value);
    }
  }

  add(payload: Payload) {
    return this.pack(this.get() + payload.get());
  }

  div(payload: Payload) {
    return this.pack(this.get() / payload.get());
  }

  gt(payload: Payload) {
    return this.get() > payload.get();
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
