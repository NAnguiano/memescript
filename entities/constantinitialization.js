class ConstantInitialization {

  constructor(id, expression) {
    this.id = id;
    this.expression = expression;
  }

  analyze(context) {
    if (context.hasBeenDeclared(this.id)) {
      throw new Error(`${this.id} has already been declared.`);
    }
    const type = this.expression.analyze(context);
    context.initialize(this.id, type, true);
  }

  toString() {
    return `(ConstInit ${this.id} ${this.expression})`;
  }

}

module.exports = ConstantInitialization;
