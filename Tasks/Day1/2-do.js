'use strict';

const Do = (value) => {
    const binds = [];
    const run = () => binds.reduce((acc, fn) => fn(acc), value);
    const bind = fn => {
        binds.push(fn);
        return {bind,run};
    }
    return { bind };
}

Do({ id: 15 })
  .bind(({ id }) => ({ id, name: 'marcus', age: 42 }))
  .bind(({ name, age }) => (name === 'marcus' ? (log) => log(age) : () => {}))
  .run()(console.log);
