class FunctionCall {

  constructor(id, args) {
    this.id = id;
    this.args = args;
  }

  analyze(context) {
    if (!context.hasBeenDeclared(this.id)) {
      throw new Error(`Function ${this.id} has not been declared`);
    }
    const functionDeclaration = context.lookup(this.id);
    if (!functionDeclaration.func) {
      throw new Error(`${this.id} is not a function.`);
    }
    this.args.analyze(context);
    // TODO: Clean this up.. yikes
    const numRequiredParams = functionDeclaration.func.numRequiredParams;
    const numParams = functionDeclaration.func.parameters.length;
    const numArgs = this.args.length;
    if (numArgs < numRequiredParams) {
      throw new Error(`Function ${this.id} was called with ${numArgs} arguments, when ${numRequiredParams} are required.`);
    }
    if (numArgs > numParams) {
      throw new Error(`Function ${this.id} was called with ${numArgs} arguments, when ${numParams} is the maximum allowed.`);
    }
    if (numArgs > numRequiredParams) {
      for (let i = numRequiredParams; i < numArgs; i += 1) {
        const argType = this.args.args[i].analyze(context);
        const paramType = functionDeclaration.func.parameters.params[i].expression.analyze(context);
        if (!argType.isEquivalentTypeTo(paramType)) {
          throw new Error(`Optional parameter ${functionDeclaration.func.parameters.params[i].id} is expected to be of type ${paramType.type}, not ${argType.type}`);
        }
      }
    }
    return functionDeclaration.type;
  }

  toString() {
    return `(FunCall ${this.id} ${this.args})`;
  }

  optimize() {
    this.args.optimize();
    return this;
  }

}

module.exports = FunctionCall;
