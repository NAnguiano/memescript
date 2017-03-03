class ConstantDeclaration {

  constructor(id) {
    this.id = id;
  }

  toString() {
    return `(ConstDec ${this.id})`;
  }

}

module.exports = ConstantDeclaration;
