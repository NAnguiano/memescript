class VariableSubscript {

  constructor(variable, expression) {
    this.variable = variable;
    this.expression = expression;
  }

  toString() {
    return `(Subscript ${this.variable} ${this.expression})`;
  }

}

module.exports = VariableSubscript;
