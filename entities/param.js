/* eslint-disable class-methods-use-this, no-unused-vars */
class Param {
  constructor(id) {
    this.id = id;
    this.type = 'required';
  }

  analyze(context) {
    // Nothing to analyze. Intentionally left blank.
  }

  toString() {
    return `(Param ${this.id})`;
  }

  optimize() {
    return this;
  }
}

module.exports = Param;
