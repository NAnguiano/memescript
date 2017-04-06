const Type = require('./type');

class Variable {

  constructor(id, type, isConstant, func = null, obj = null) {
    this.id = id;
    this.type = type;
    this.func = func;
    this.obj = obj;
    this.isConstant = isConstant;
  }

}

class Context {

  constructor({
                parent = null,
                inFunction = false,
                functionId = null,
                inLoop = false,
                inObject = false,
              } = {}) {
    this.parent = parent;
    this.inFunction = inFunction;
    this.functionId = functionId;
    this.inLoop = inLoop;
    this.inObject = inObject;
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
      throw new Error(`${id} has already been declared.`);
    }
    this.variablesInScope[id] = new Variable(id, type, isConstant);
  }

  initializeFunction(id, func) {
    if (id in this.variablesInScope) {
      throw new Error(`${id} has already been declared.`);
    }
    this.variablesInScope[id] = new Variable(id, Type.NULL, true, func);
  }

  initializeObject(id, obj) {
    if (id in this.variablesInScope) {
      throw new Error(`${id} has already been declared.`);
    }
    this.variablesInScope[id] = new Variable(id, Type.OBJECT, true, null, obj);
  }

  setFunctionType(id, type) {
    if (!this.variablesInScope[id].func) {
      throw new Error('Cannot set function type of non-function variable.');
    }
    this.variablesInScope[id].type = type;
  }

  reassign(id, type) {
    if (!(this.lookup(id))) {
      throw new Error(`${id} has not been declared.`);
    }
    if (this.lookup(id).isConstant) {
      throw new Error(`Constant ${id} cannot be re-initialized.`);
    }
    this.lookup(id).type = type;
  }

  lookup(id) {
    if (this.hasBeenDeclared(id)) {
      // If I'm declared, but not in this context...
      if (!(id in this.variablesInScope)) {
        return this.parent.lookup(id);
      }
      return this.variablesInScope[id];
    }
    return null;
  }

}

module.exports = Context;
