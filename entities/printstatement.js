class PrintStatement {

  constructor(expression, error = false) {
    this.expression = expression;
    this.error = error;
  }

  analyze(context) {
    this.expression.analyze(context);
  }

  toString() {
    return `(${(this.error) ? 'Error' : 'Print'} ${this.expression})`;
  }

}

module.exports = PrintStatement;
