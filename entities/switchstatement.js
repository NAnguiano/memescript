class SwitchStatement {

  constructor(expression, literals, blocks, block) {
    this.expression = expression;
    this.cases = cases;
    this.defaultCase = defaultCase;
  }

  toString() {
    return `(Switch ${this.expression} ${this.cases.join(' ')} ${this.defaultCase})`;
  }

}

module.exports = SwitchStatement;
