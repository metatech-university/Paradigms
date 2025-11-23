// Rewrite from OOP with mutable state
// to FP using class-based syntax, immutable instance, method chaining

class Adder {
    private readonly value: number;

    constructor(initial: number) {
        this.value = initial;
    }

    static of(value: number): Adder {
        return new Adder(value);
    }

    add(x: number): Adder {
        return Adder.of(this.value + x);
    }

    valueOf(): number {
        return this.value;
    }
}

const sum1 = new Adder(1).add(9).add(1).add(7);
console.log('Sum1:', +sum1);

const sum2 = Adder.of(1).add(9).add(1).add(7);
console.log('Sum2:', +sum1);
