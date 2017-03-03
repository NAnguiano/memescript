class ForStatement {

  constructor(body, varDec, expression) {
    this.body = body;
    this.varDeclaration = varDec;
    this.expression = expression;
  }

  toString() {
    return `(For ${this.body} ${this.varDec} ${this.expression} ${this.expression})`;
  }

}

module.exports = ForStatement;
