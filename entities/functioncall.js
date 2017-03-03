class FuntionCall {

  constructor(id, args) {
    this.id = id;
    this.args = args;
  }

  toString() {
    return `(FunCall ${this.id} ${this.args})`;
  }

}

module.exports = FuntionCall;
