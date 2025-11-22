'use strict';

class Do {
  #personData;

  constructor (id) {
    this.#personData = {id: this.id, name: 'marcus', age: 42};
  }

  nameMatch(name) {
    return name === 'marcus';
  }

  log(age) {
    console.log(age)
  }

  run() {
    return this.nameMatch(this.#personData.name) ? this.log(this.#personData.age) : {};
  }
}

// Do({ id: 15 })
//   .bind(({ id }) => ({ id, name: 'marcus', age: 42 }))
//   .bind(({ name, age }) => (name === 'marcus' ? (log) => log(age) : () => {}))
//   .run()(console.log);


const rewritedDo = new Do({id: 15}).run();