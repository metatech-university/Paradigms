'use strict';

// Put implementation here in class syntax
const Do = (value) => ({
  value,
  bind(fn) {
    const evaluate = typeof value === 'function' ? value : () => value;
    return Do(() => fn(evaluate()));
  },
  run() {
    return typeof value === 'function' ? value() : value;
  }
});

Do({ id: 15 })
  .bind(({ id }) => ({ id, name: 'marcus', age: 42 }))
  .bind(({ name, age }) => (name === 'marcus' ? (log) => log(age) : () => {}))
  .run()(console.log);
