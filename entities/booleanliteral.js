const Type = require('../semantics/type');

/* eslint-disable class-methods-use-this, no-unused-vars */
class BooleanLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze(context) {
    return Type.BOOL;
  }

  toString() {
    return this.value;
  }
  
  optimize() {
    return this;
  }
}

module.exports = BooleanLiteral;
