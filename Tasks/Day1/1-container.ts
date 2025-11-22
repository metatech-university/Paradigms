class Integer {
  #value: number
  constructor(a: number){
    // todo we might want to check the type before assingment
    this.#value = a
  }
  add(a: Integer){
    return new Integer(this.#value + a.#value)
  }

  div(a: Integer){
    // todo we might want to handle div by 0
    return new Integer(this.#value/a.#value)
  }

  gt(a:Integer){
    return this.#value > a.#value
  }

  get(): number{
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
