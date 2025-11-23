'use strict';

function DoFunctional (entity) {
    const operations = [];

    return {
        bind: function (command) {
            if (typeof command !== 'function') throw new Error('argument is not a function')
            operations.push(command);
            return this;
        },
        run: function() {
            while (operations.length) entity = operations.shift()(entity);
            return entity
        }
    }
}

class DoClass {
    constructor(entity) {
        this.entity = entity;
        this.operations = [];
    }

    bind(command) {
        if (typeof command !== 'function') throw new Error('argument is not a function')
        this.operations.push(command);
        return this;
    }

    run() {
        while (this.operations.length) this.entity = this.operations.shift()(this.entity)
        return this.entity;
    }
}

DoFunctional({ id: 15 })
    .bind(({ id }) => ({ id, name: 'marcus', age: 42 }))
    .bind(({ name, age }) => (name === 'marcus' ? (log) => log(age) : () => {}))
    .run()(console.log);

new DoClass({ id: 15 })
  .bind(({ id }) => ({ id, name: 'marcus', age: 42 }))
  .bind(({ name, age }) => (name === 'marcus' ? (log) => log(age) : () => {}))
  .run()(console.log);