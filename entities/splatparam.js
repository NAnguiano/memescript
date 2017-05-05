/* eslint-disable class-methods-use-this, no-unused-vars */
class SplatParam {
  constructor(id) {
    this.id = id;
    this.type = 'splat';
  }

  analyze(context) {
    // Nothing to analyze. Intentionally left blank.
  }

  toString() {
    return `(SplatParam ${this.id})`;
  }

  optimize() {
    return this;
  }
}

module.exports = SplatParam;
