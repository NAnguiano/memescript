class TryCatchFinallyStatement {

  constructor(trybody, catchbody, finallybody) {
    this.trybody = trybody;
    this.catchbody = catchbody;
    this.finallybody = finallybody;
  }

  toString() {
    return `(Try ${this.trybody} Catch ${this.catchbody} Finally ${this.finallybody})`;
  }

}

module.exports = TryCatchFinallyStatement;
