class VariableSubscript {

  constructor(variable, expression) {
    this.variable = variable;
    this.expression = expression;
  }

  analyze(context) {
    const type = this.variable.analyze(context);
    if (!type.isObject()) {
      throw new Error('Can only use bracket notation on type Object.');
    }
    this.expression.analyze(context);
  }

  toString() {
    return `(Subscript ${this.variable} ${this.expression})`;
  }

  optimize() {
    this.expression = this.expression.optimize();
    return this;
  }

}

module.exports = VariableSubscript;
