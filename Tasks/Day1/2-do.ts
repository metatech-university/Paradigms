type AnyFn = (...args: unknown[]) => unknown;

class Do<TIn, TOut> {
    constructor(
        private readonly initialData: TIn,
        private readonly pipeline: (value: TIn) => TOut
    ) {}

    static of<T>(initial: T): Do<T, T> {
        return new Do(initial, (x) => x);
    }

    public bind<U>(fn: (value: TOut) => U): Do<TIn, U> {
        const nextPipeline = (value: TIn) => fn(this.pipeline(value));
        return new Do<TIn, U>(this.initialData, nextPipeline);
    }

    public run(): TOut {
        return this.pipeline(this.initialData);
    }
}

const resultFn = Do.of({ id: 15 })
  .bind(({ id }) => ({ id, name: 'marcus', age: 42 }))
  .bind(({ name, age }) => (name === 'marcus' ? (log: AnyFn) => log(age) : () => {}))
  .run();

resultFn(console.log);
