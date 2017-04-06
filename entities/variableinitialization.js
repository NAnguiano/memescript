class VarInit {

  constructor(id, expression) {
    this.id = id;
    this.expression = expression;
  }

  analyze(context) {
    if (context.hasBeenDeclared(this.id)) {
      throw new Error(`${this.id} has already been declared.`);
    }
    const type = this.expression.analyze(context);
    context.initialize(this.id, type, false);
  }

  toString() {
    return `(VarInit ${this.id} ${this.expression})`;
  }

}

module.exports = VarInit;
