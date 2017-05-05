const Context = require('../semantics/context');

class Program {

  constructor(block) {
    this.block = block;
  }

  analyze() {
    this.block.analyze(new Context());
  }

  toString() {
    return `(Program ${this.block})`;
  }

  optimize() {
  	this.block.optimize();
  	return this;
  }

}

module.exports = Program;
