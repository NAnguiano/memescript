/* eslint-disable class-methods-use-this, no-unused-vars */
class SplatParam {
  constructor(id) {
    this.id = id;
    this.type = 'splat';
  }

  analyze(context) {
    // Do nothing.
  }

  toString() {
    return `(SplatParam ${this.id})`;
  }
}

module.exports = SplatParam;
