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

}

module.exports = Alert;
