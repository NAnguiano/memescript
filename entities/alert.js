class Alert {

  constructor(expression) {
    this.expression = expression;
  }

  analyze(context) {
    this.expression.analyze(context);
  }

  toString() {
    return `(Alert ${this.expression})`;
  }

  optimize() {
    this.expression = this.expression.optimize();
    return this;
  }

}

module.exports = Alert;
