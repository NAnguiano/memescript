class ObjectInitialization {

  constructor(id, args) {
    this.id = id;
    this.args = args;
  }

  analyze(context) {
    if (!context.hasBeenDeclared(this.id)) {
      throw new Error(`Object ${this.id} has not been declared`);
    }
    const objectDeclaration = context.lookup(this.id);
    if (!objectDeclaration.obj) {
      throw new Error(`${this.id} is not an object.`);
    }
    this.args.analyze(context);

    // TODO: Clean this up.. yikes
    // Repeated code from funcall
    const numRequiredParams = objectDeclaration.obj.constructor.numRequiredParams;
    const numParams = objectDeclaration.obj.constructor.params.length;
    const numArgs = this.args.length;
    if (numArgs < numRequiredParams) {
      throw new Error(`Object ${this.id} was instantiated with ${numArgs} arguments, when ${numRequiredParams} are required.`);
    }
    if (numArgs > numParams) {
      throw new Error(`Object ${this.id} was instantiated with ${numArgs} arguments, when ${numParams} is the maximum allowed.`);
    }
    if (numArgs > numRequiredParams) {
      for (let i = numRequiredParams; i < numArgs; i += 1) {
        const argType = this.args.args[i].analyze(context);
        const paramType =
          objectDeclaration.obj.constructor.params.params[i].expression.analyze(context);
        if (!argType.isEquivalentTypeTo(paramType)) {
          throw new Error(`Optional parameter ${objectDeclaration.obj.constructor.params.params[i].id} is expected to be of type ${paramType.type}, not ${argType.type}`);
        }
      }
    }
    return objectDeclaration.type;
  }

  toString() {
    return `(FunCall ${this.id} ${this.args})`;
  }

}

module.exports = ObjectInitialization;
