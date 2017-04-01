class TryCatchFinally {

  constructor(trybody, id, catchbody, finallybody) {
    this.trybody = trybody;
    this.catchbody = catchbody;
    this.err = id;
    this.finallybody = finallybody;
  }

  toString() {
    return `(Try ${this.trybody} Catch ${this.err} ${this.catchbody} Finally ${this.finallybody})`;
  }

}

module.exports = TryCatchFinally;
