const Context = require('../semantics/context');
const Type = require('../semantics/type');

class TryCatchFinally {

  constructor(trybody, id, catchbody, finallybody) {
    this.trybody = trybody;
    this.err = id;
    this.catchbody = catchbody;
    this.finallybody = finallybody;
  }

  analyze(context) {
    this.trybody.analyze(context);
    const catchContext = new Context({ parent: context, inFunction: context.inFunction });
    catchContext.initialize(this.err, Type.OBJECT, false);
    this.catchbody.analyze(catchContext);
    this.finallybody.analyze(context);
  }

  toString() {
    return `(Try ${this.trybody} Catch ${this.err} ${this.catchbody} Finally ${this.finallybody})`;
  }

  optimize() {
    this.trybody.optimize();
    this.catchbody.optimize();
    this.finallybody.optimize();
    return this;
  }

}

module.exports = TryCatchFinally;
