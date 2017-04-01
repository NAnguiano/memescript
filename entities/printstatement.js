class PrintStatement {

  constructor(expression, error = false) {
    this.expression = expression;
    this.error = error;
  }

  toString() {
    return `(${(this.error) ? 'Error' : 'Print'} ${this.expression})`;
  }

}

module.exports = PrintStatement;
