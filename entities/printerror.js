class PrintError {

  constructor(expression) {
    this.expression = expression;
  }

  toString() {
    return `(Error ${this.expression})`;
  }

}

module.exports = PrintError;
