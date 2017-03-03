class Block {

  constructor(statements) {
    this.statements = statements;
  }

  toString() {
    return `Block ${this.statements.join(' ')}`;
  }

}

module.exports = Block;
