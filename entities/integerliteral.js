const Type = require('../semantics/type');

/* eslint-disable class-methods-use-this, no-unused-vars */
class IntegerLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze(context) {
    return Type.INT;
  }

  toString() {
    return this.value;
  }

  optimize() {
  	return this;
  }
}

module.exports = IntegerLiteral;
