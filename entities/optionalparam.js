class OptionalParam {
  constructor(id, expression) {
    this.id = id;
    this.expression = expression;
    this.type = 'optional';
  }

  analyze(context) {
    const type = this.expression.analyze(context);
    this.exprType = type;
  }

  toString() {
    return `(OptionalParam ${this.id} ${this.expression})`;
  }

  optimize() {
    this.expression = this.expression.optimize();
    return this;
  }
}

module.exports = OptionalParam;
