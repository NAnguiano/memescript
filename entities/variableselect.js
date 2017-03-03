class VariableSelect {

  constructor(variable, id) {
    this.variable = variable;
    this.expression = id;
  }

  toString() {
    return `(Subscript ${this.variable} ${this.id})`;
  }

}

module.exports = VariableSelect;
