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

}

module.exports = Block;
