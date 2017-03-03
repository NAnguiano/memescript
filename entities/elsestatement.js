class ElseStatement {

  constructor(body) {
    this.body = body;
  }

  toString() {
    return `(ElseStatement ${this.body})`;
  }

}

module.exports = ElseStatement;
