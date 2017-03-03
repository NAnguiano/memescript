class SwitchCase {

  constructor(literal, block) {
    this.literal = literal;
    this.block = block;
  }

  toString() {
    return `(SwitchCase ${this.literal} ${this.block})`;
  }

}

module.exports = SwitchCase;
