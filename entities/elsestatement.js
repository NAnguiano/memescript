class ElseStatement {

  constructor(body) {
    this.body = body;
  }

  analyze(context) {
    this.body.analyze(context);
  }

  toString() {
    return `(ElseStatement ${this.body})`;
  }

}

module.exports = ElseStatement;
