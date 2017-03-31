class Variable {

  constructor(id, type, isConstant) {
    this.id = id;
    this.type = type;
    this.isConstant = isConstant;
  }

}

class Context {

  constructor({ parent = null, inFunction = false, inLoop = false } = {}) {
    this.inFunction = inFunction;
    this.parent = parent;
    this.inLoop = inLoop;
    this.variablesInScope = Object.create(null);
  }

  hasBeenDeclared(id) {
    if (id in this.variablesInScope) {
      return true;
    }
    if (this.parent === null) {
      return false;
    }
    return this.parent.hasBeenDeclared(id);
  }

  initialize(id, type, isConstant) {
    if (id in this.variablesInScope) {
      throw new Error(`${id} already declared.`);
    }
    this.variablesInScope[id] = new Variable(id, type, isConstant);
  }

  declare(id, type) {
    if (!(id in this.variablesInScope)) {
      throw new Error(`${id} has not been declared.`);
    }
    if (this.variablesInScope[id].isConstant) {
      throw new Error(`Constant ${id} cannot be re-initialized.`);
    }
    this.variablesInScope[id].type = type;
  }

  lookup(id) {
    if (this.hasBeenDeclared(id)) {
      return this.variablesInScope[id];
    }
    return null;
  }

}

module.exports = Context;
