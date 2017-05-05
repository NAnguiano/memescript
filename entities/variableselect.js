class VariableSelect {

  constructor(variable, id) {
    this.variable = variable;
    this.id = id;
  }

  analyze(context) {
    const type = this.variable.analyze(context);
    if (!type.isObject()) {
      throw new Error(`Can only use dot notation on type Object, not ${type.type}.`);
    }
    // For now, we'll leave it up to the programmer to ensure that the
    // object methods they're calling are a part of the class they've instantiated.
    // Until I can figure out a clean way to see the object's context without things getting
    // too messy.
  }

  toString() {
    return `(Subscript ${this.variable} ${this.id})`;
  }

  optimize() {
    return this;
  }

}

module.exports = VariableSelect;
