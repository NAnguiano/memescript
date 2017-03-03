class FunctionDeclaration {
  constructor(id, parameters, body) {
    this.id = id;
    this.parameters = parameters;
    this.body = body;
  }

  toString() {
    return `FunDec ${this.id} ${this.parameters} ${this.body}`;
  }
}

module.exports = FunctionDeclaration;
