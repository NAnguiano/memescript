class Program {

  constructor(block) {
    this.block = block;
  }

  toString() {
    return `(Program ${this.block})`;
  }

}

module.exports = Program;
