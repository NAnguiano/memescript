const Type = require('../semantics/type');

class ObjectConstructor {
  constructor(params, body) {
    this.params = params;
    this.body = body;
  }

  analyze(context) {
    // TODO: This is repeated code from function declaration. Fix that.
    // Ensure the parameters are in the proper order.
    this.params.analyze(context);

    this.numRequiredParams = 0;

    // Finally, declare.
    this.params.params.forEach((p) => {
      if (p.type === 'optional') {
        context.initialize(p.id, p.exprType, false);
      } else if (p.type === 'splat') {
        context.initialize(p.id, Type.OBJECT, false);
      } else {
        context.initialize(p.id, Type.NULL, false);
        this.numRequiredParams += 1;
      }
    });
    this.body.analyze(context);
  }

  toString() {
    return `ObjConstructor ${this.params} ${this.body}`;
  }

  optimize() {
    this.params.optimize();
    this.body.optimize();
    return this;
  }
}

module.exports = ObjectConstructor;
