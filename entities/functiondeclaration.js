const Context = require('../semantics/context');
const Type = require('../semantics/type');

class FunctionDeclaration {
  constructor(id, parameters, body) {
    this.id = id;
    this.parameters = parameters;
    this.body = body;
  }

  analyze(context) {
    if (context.hasBeenDeclared(this.id)) {
      throw new Error(`${this.id} has already been declared.`);
    }

    // Store the entire function so that we can refer to it later.
    context.initializeFunction(this.id, this);

    // Create a new context for the function.
    const innerContext = new Context({ parent: context, inFunction: true, functionId: this.id });

    this.numRequiredParams = 0;

    // Ensure the parameters are in the proper order.
    this.parameters.analyze(context);

    // Finally, declare.
    this.parameters.params.forEach((p) => {
      if (p.type === 'optional') {
        innerContext.initialize(p.id, p.exprType, false);
      } else if (p.type === 'splat') {
        innerContext.initialize(p.id, Type.OBJECT, false);
      } else {
        innerContext.initialize(p.id, Type.NULL, false);
        this.numRequiredParams += 1;
      }
    });

    // Evaluate body, setting type if possible.
    this.body.analyze(innerContext);
  }

  toString() {
    return `(FunDec ${this.id} ${this.parameters} ${this.body})`;
  }

  optimize() {
    this.parameters.optimize();
    this.body.optimize();
    return this;
  }
}

module.exports = FunctionDeclaration;
