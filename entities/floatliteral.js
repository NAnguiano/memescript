const Type = require('../semantics/type');

/* eslint-disable class-methods-use-this, no-unused-vars */
class FloatLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze(context) {
    return Type.FLOAT;
  }

  toString() {
    return this.value;
  }

  optimize() {
    return this;
  }
}

module.exports = FloatLiteral;
