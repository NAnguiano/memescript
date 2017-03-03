class PrintStatement {

  constructor(expression) {
    this.block = expression;
  }

  toString() {
    return `(Print ${this.expression})`;
  }

}

module.exports = PrintStatement;
