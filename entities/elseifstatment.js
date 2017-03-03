class ElseIfStatement {
  constructor(expression, body) {
    this.expression = expression;
    this.body = body;
  }

  toString() {
    return `(ElseIfStatement ${this.expression} ${this.body})`;
  }
}

module.exports = ElseIfStatement;
