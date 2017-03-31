class FunctionArguments {

  constructor(firstArg, rest) {
    this.args = firstArg.concat((rest.length > 0) ? rest[0] : rest);
  }

  toString() {
    return `(FunctionArguments ${this.expression} ${this.args.join(' ')})`;
  }

}

module.exports = FunctionArguments;
