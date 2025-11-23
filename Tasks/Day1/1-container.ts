class Integer {
  private readonly value: number;

  constructor(value: number) {
    this.value = Math.trunc(value);
  }

  add(x: Integer) {
    return new Integer(this.value + x.get());
  }

  div(x: Integer) {
    if (x.get() === 0) return new Integer(NaN);
    return new Integer(this.value / x.get());
  }

  gt(x: Integer) {
    return this.value > x.get();
  }

  get() {
    return this.value;
  }
}

// Usage

const a = new Integer(7);
const b = new Integer(3);
const y = new Integer(0);

const c = a.add(b);
const d = a.div(b);
const e = a.div(y);
if (a.gt(b)) {
  console.log("a > b");
}

console.log(`c = ${c.get()}`) // 10;
console.log(`d = ${d.get()}`) // 2;
console.log(`e = ${e.get()}`) // NaN;
