'use strict';

const Do = (value) => {
  const thunk = typeof value === 'function' ? value : () => value;

  return {
    bind: (fn) => Do(() => fn(thunk())),
    run: () => thunk(),
  };
};

Do({ id: 15 })
  .bind(({ id }) => ({ id, name: 'marcus', age: 42 }))
  .bind(({ name, age }) => (name === 'marcus' ? (log) => log(age) : () => {}))
  .run()(console.log);
