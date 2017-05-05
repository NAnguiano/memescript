const Context = require('../semantics/context');
const Type = require('../semantics/type');

class TryCatch {

  constructor(trybody, id, catchbody) {
    this.trybody = trybody;
    this.err = id;
    this.catchbody = catchbody;
  }

  analyze(context) {
    this.trybody.analyze(context);
    const catchContext = new Context({ parent: context, inFunction: context.inFunction });
    catchContext.initialize(this.err, Type.OBJECT, false);
    this.catchbody.analyze(catchContext);
  }

  toString() {
    return `(Try ${this.trybody} Catch ${this.err} ${this.catchbody})`;
  }

  optimize() {
    this.trybody.optimize();
    this.catchbody.optimize();
    return this;
  }

}

module.exports = TryCatch;
