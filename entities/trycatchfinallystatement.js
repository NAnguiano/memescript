class TryCatchFinallyStatement {

  constructor(body) {
    this.body = body;
  }

  toString() {
    return `(Try ${this.body} Catch ${this.body} Finally ${this.body})`;
  }

}

module.exports = TryCatchFinallyStatement;
