class FunctionArguments {

  constructor(firstArg, rest) {
    this.args = firstArg.concat((rest.length > 0) ? rest[0] : rest);
  }

  analyze(context) {
    this.args.forEach(a => a.analyze(context));
    this.length = this.args.length;
  }

  toString() {
    return `(FunctionArguments ${this.expression} ${this.args.join(' ')})`;
  }

  optimize() {
    this.args.map(a => a.optimize());
    return this;
  }
}

module.exports = FunctionArguments;
