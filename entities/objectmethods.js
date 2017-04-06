const Context = require('../semantics/context');
const Type = require('../semantics/type');

class ObjectMethods {
  constructor(id, params, body) {
    this.id = id;
    this.parameters = params;
    this.body = body;
  }

  analyze(context) {
    if (context.hasBeenDeclared(this.id)) {
      throw new Error(`${this.id} has already been declared.`);
    }

    // TODO: This is repeated code from function declaration. Fix that.
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
    return `ObjMethods ${this.id} ${this.params} ${this.body}`;
  }
}

module.exports = ObjectMethods;
