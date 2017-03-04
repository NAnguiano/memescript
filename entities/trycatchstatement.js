class TryCatchStatement {

  constructor(trybody, id, catchbody) {
    this.trybody = trybody;
    this.err = id;
    this.catchbody = catchbody;
  }

  toString() {
    return `(Try ${this.trybody} Catch ${this.err} ${this.catchbody})`;
  }

}

module.exports = TryCatchStatement;
