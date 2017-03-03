class FunctionArguments {

  constructor(expression, args) {
    console.log(args);
    this.expression = expression;
    if (args[0] && args[0].length > 0) {
      this.args = args[0];
    } else {
      this.args = args;
    }
  }

  toString() {
    return `(FunctionArguments ${this.expression} ${this.args.join(' ')})`;
  }

}

module.exports = FunctionArguments;
