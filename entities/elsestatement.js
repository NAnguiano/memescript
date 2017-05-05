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

  optimize() {
    this.body.optimize();
    return this;
  }

}

module.exports = ElseStatement;
