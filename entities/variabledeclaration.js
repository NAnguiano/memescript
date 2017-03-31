const Null = require('./null');

class VarDec {

  constructor(id) {
    this.id = id;
    this.value = new Null();
  }

  analyze(context) {
    context.declare(this.id, this.value); // If we're doing typing, we'd do this as second arg
  }

  toString() {
    return `(VarDec ${this.id})`;
  }

}

module.exports = VarDec;
