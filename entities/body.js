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

  optimize() {
    this.statements.map(s => s.optimize()).filter(s => s !== null);
  }

}

module.exports = Body;
