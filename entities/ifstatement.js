class IfStatement {

  constructor(expression, body) {
    this.expression = expression;
    this.body = body;
  }

  toString() {
    return `(IfStatement ${this.expression} ${this.body})`;
  }
}

module.exports = IfStatement;
