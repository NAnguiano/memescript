const Type = require('../semantics/type');

/* eslint-disable class-methods-use-this, no-unused-vars */
class Null {
  constructor() {
    this.value = null;
  }

  analyze(context) {
    return Type.NULL;
  }

  toString() {
    return this.value;
  }

  optimize() {
    return this;
  }
}

module.exports = Null;
