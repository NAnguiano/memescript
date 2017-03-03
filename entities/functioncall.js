class FunCall {

  constructor(id, args) {
    this.id = id;
    this.args = args;
  }

  toString() {
    return `(FunCall ${this.id} ${this.args.join(' ')})`;
  }

}

module.exports = FunCall;
