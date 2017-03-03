class ReturnStatement {

  constructor(expression) {
    this.expression = expression;
  }

  toString() {
    return `(Return ${this.expression})`;
  }

}

module.exports = ReturnStatement;
