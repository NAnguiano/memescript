class UnaryExpression {

  constructor(prefix, expression) {
    this.prefix = prefix;
    this.expression = expression;
  }

  toString() {
    return `(UnaryExpression ${this.prefix} ${this.expression})`;
  }

}

module.exports = UnaryExpression;
