class ElseIfStatement {

  constructor(expression, body) {
    this.expression = expression;
    this.body = body;
  }

  analyze(context) {
    const type = this.expression.analyze(context);
    if (!type.isBoolean()) {
      throw new Error('Else-if statement accepts only boolean expressions.');
    }
    this.body.analyze(context);
  }

  toString() {
    return `(ElseIfStatement ${this.expression} ${this.body})`;
  }

  optimize() {
    this.expression = this.expression.optimize();
    this.body.optimize();
    return this;
  }

}

module.exports = ElseIfStatement;
