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

  optimize() {
    this.expression = this.expression.optimize();
    return this;
  }

}

module.exports = PrintStatement;
