"use strict";

const reader = ({ id }) => ({ id, name: "marcus", age: 42 });

class Exec {
  #reader;
  #logger;

  constructor(options = {}) {
    this.#reader = options.reader || (() => ({}));
    this.#logger = options.logger || console.log;
  }

  #processStep({ result, success, fail }) {
    if (success?.match) {
      const { name, success: matchSuccess, fail: matchFail } = success.match;
      if (result.name === name) {
        return this.#processStep({ result, success: matchSuccess, fail: null });
      }
      return this.#processStep({ result, success: null, fail: matchFail });
    }

    if (success?.log) {
      this.#logger(result[success.log]);
    }

    if (fail?.log) {
      this.#logger(result[fail.log]);
    }
  }

  run(steps) {
    if (steps.read) {
      const result = this.#reader(steps.read);
      this.#processStep({
        result,
        success: steps.read.success,
        fail: steps.read.fail,
      });
    }
  }
}

// 1. Rewrite in OOP style
// 2. Improve data structure inconsistence

const main = new Exec({ reader, logger: console.log });
main.run({
  read: {
    id: 15,
    success: {
      match: { name: "marcus", success: { log: "age" }, fail: { log: "name" } },
    },
    fail: null,
  },
});
