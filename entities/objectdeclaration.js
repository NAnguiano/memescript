const Context = require('../semantics/context');

class ObjectDeclaration {
  constructor(id, cons, methods) {
    this.id = id;
    this.constructor = cons;
    this.methods = methods;
  }

  analyze(context) {
    context.initializeObject(this.id, this);
    const objectContext = new Context({ parent: context, inObject: true });
    this.numObjectParameters = this.constructor.analyze(objectContext);
    this.methods.forEach(m => m.analyze(objectContext));
  }

  toString() {
    return `ObjDec ${this.id} ${this.constructor} ${this.methods}`;
  }
}

module.exports = ObjectDeclaration;
