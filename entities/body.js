class Body {

  constructor(statements) {
    this.statements = statements;
  }

  analyze(context) {
    this.statements.forEach(s => s.analyze(context));
  }

  toString() {
    return `(Body ${this.statements.join(' ')})`;
  }

}

module.exports = Body;
