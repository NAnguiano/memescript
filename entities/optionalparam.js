class OptionalParam {
  constructor(id, expression) {
    this.id = id;
    this.expression = expression;
  }

  toString() {
    return `(OptionalParam ${this.id} ${this.expression})`;
  }
}

module.exports = OptionalParam;
