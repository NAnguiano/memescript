class Assignment {

  constructor(id, expression) {
    this.id = id;
    this.expression = expression;
  }

  analyze(context) {
    if (!context.hasBeenDeclared(this.id)) {
      throw new Error(`${this.id} has not been declared.`);
    }
    if (context.lookup(this.id).isConstant) {
      throw new Error(`Constant ${this.id} cannot be reassigned.`);
    }
    const type = this.expression.analyze(context);
    context.reassign(this.id, type);
  }

  toString() {
    return `(Assignment ${this.id} ${this.expression})`;
  }

  optimize() {
    this.expression = this.expression.optimize();
    return this;
  }

}

module.exports = Assignment;
