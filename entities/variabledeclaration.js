const Type = require('../semantics/type');

class VarDec {

  constructor(id) {
    this.id = id;
  }

  analyze(context) {
    if (context.hasBeenDeclared(this.id)) {
      throw new Error(`${this.id} has already been declared.`);
    }
    context.initialize(this.id, Type.NULL, false);
  }

  toString() {
    return `(VarDec ${this.id})`;
  }

}

module.exports = VarDec;
