class SwitchCase {

  constructor(literal, block) {
    this.literal = literal;
    this.block = block;
  }

  analyze(context) {
    this.literal.analyze(context);
    if (this.block.length > 0) this.block[0].analyze(context);
  }

  toString() {
    return `(SwitchCase ${this.literal} ${this.block})`;
  }

  optimize() {
    this.block.optimize();
    return this;
  }

}

module.exports = SwitchCase;
