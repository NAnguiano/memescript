class Alert {

  constructor(expression) {
    this.expression = expression;
  }

  toString() {
    return `(Alert ${this.expression})`;
  }

}

module.exports = Alert;
