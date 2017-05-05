class Block {

  constructor(statements) {
    this.statements = statements;
  }

  analyze(context) {
    this.statements.forEach(s => s.analyze(context));
  }

  toString() {
    return `(Block ${this.statements.join(' ')})`;
  }

  optimize() {
    this.statements.map(s => s.optimize()).filter(s => s !== null);
  }

}

module.exports = Block;
