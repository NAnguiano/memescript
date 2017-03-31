const error = require('../error');

class Context {

  constructor({ parent = null, inFunction = false, inLoop = false } = {}) {
    this.inFunction = inFunction;
    this.parent = parent;
    this.inLoop = inLoop;
    this.localVariables = Object.create(null);
  }

  declare(id, value) {
    if (id in this.localVariables) {
      error(`${id} already declared`); // ONLY IN CONSTANTS... need to come up with a way to distinguish
    }
    // May not need value because it is dynamically typed...
    this.localVariables[id] = value;
  }

  hasBeenDeclared(id) {
    // we may need to look in the parent context for params and globals!
    if (id in this.localVariables) {
      return true;
    }
    if (this.parent === null) {
      return false;
    }
    return this.parent.hasBeenDeclared(id);
  }

  lookup(id) {
    if (this.hasBeenDeclared(id)) {
      return this.localVariables[id];
    }
    return null;
  }

}

module.exports = Context;
