class SwitchStatement {

  constructor(expression, switchCases, switchDefault) {
    this.expression = expression;
    this.switchCases = switchCases;
    this.switchDefault = switchDefault;
  }

  toString() {
    return `(Switch ${this.expression} ${this.switchCases.join(' ')} ${this.switchDefault})`;
  }

}

module.exports = SwitchStatement;
