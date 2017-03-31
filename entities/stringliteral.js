const Type = require('../semantics/type');

/* eslint-disable class-methods-use-this, no-unused-vars */
class StringLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze(context) {
    return Type.STRING;
  }

  toString() {
    return this.value;
  }
}

module.exports = StringLiteral;
