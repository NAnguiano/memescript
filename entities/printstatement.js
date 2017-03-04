class PrintStatement {

  constructor(expression) {
    this.expression = expression;
  }

  toString() {
    return `(Print ${this.expression})`;
  }

}

module.exports = PrintStatement;
