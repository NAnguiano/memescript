class FunCall {

  constructor(variable, expression) {
    this.variable = variable;
    this.expression = expression;
  }

  toString() {
    return `FunCall ${this.variable} ${this.expression}`;
  }

}

module.exports = FunCall;
