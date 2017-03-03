class IfStatement {

  constructor(expression, body, elseifStatement, elseStatement) {
    this.expression = expression;
    this.body = body;
    this.elseifStatement = elseifStatement;
    this.elseStatement = elseStatement;
  }

  toString() {
    return `(IfStatement ${this.expression} ${this.body} ${this.elseifStatement.join(' ')} ${this.elseStatement})`;
  }
}

module.exports = IfStatement;
