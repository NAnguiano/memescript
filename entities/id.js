class Id {

  constructor(id) {
    this.id = id;
  }

  analyze(context) {
    if (!context.hasBeenDeclared(this.id)) {
      throw new Error(`${this.id} has not been declared.`);
    }
    return context.lookup(this.id).type;
  }

  toString() {
    return `(Id ${this.id})`;
  }

}

module.exports = Id;
