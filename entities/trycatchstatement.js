class TryCatchStatement {

  constructor(trybody, catchbody) {
    this.trybody = trybody;
    this.catchbody = catchbody;
  }

  toString() {
    return `(Try ${this.trybody} Catch ${this.catchbody})`;
  }

}

module.exports = TryCatchStatement;
