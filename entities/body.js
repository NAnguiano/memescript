class Body {

  constructor(block) {
    this.statements = block;
  }

  toString() {
    return `(Body ${this.block})`;
  }

}

module.exports = Body;
