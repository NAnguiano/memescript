const error = require('../error');

class ConstantDeclaration {

  constructor(id, value) {
    this.id = id;
    this.value = value;
  }

  analyze(context) {
    if (context.hasBeenDeclared(this.id)) {
      error(`${this.idValue} has not been declared.`);
    }
  }

  toString() {
    return `(ConstInit ${this.id} ${this.value})`;
  }

}

module.exports = ConstantDeclaration;
