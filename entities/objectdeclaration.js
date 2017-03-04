class ObjectDeclaration {
  constructor(id, cons, methods) {
    this.id = id;
    this.constructor = cons;
    this.methods = methods;
  }

  toString() {
    return `ObjDec ${this.id} ${this.constructor} ${this.methods}`;
  }
}

module.exports = ObjectDeclaration;
