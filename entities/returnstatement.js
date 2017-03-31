class ReturnStatement {

  constructor(expression) {
    this.expression = expression;
  }

  analyze(context) {
    if (!context.inFunction) {
      throw new Error('Return statements must be in a function.');
    }
    const functionType = context.parent.lookup(context.functionId).type.type;
    const type = this.expression.analyze(context);
    if (functionType !== 'null' && functionType !== type.type) {
      throw new Error(`Function returning ${functionType} should not return ${type.type}`);
    }
    context.parent.setFunctionType(context.functionId, type);
  }

  toString() {
    return `(Return ${this.expression})`;
  }

}

module.exports = ReturnStatement;
