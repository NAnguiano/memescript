class SwitchStatement {

  constructor(expression, switchCases, switchDefault) {
    this.expression = expression;
    this.switchCases = switchCases;
    this.switchDefault = switchDefault;
  }

  analyze(context) {
    this.switchCases.forEach(sc => sc.analyze(context));
    this.switchDefault.analyze(context);
  }

  toString() {
    return `(Switch ${this.expression} ${this.switchCases.join(' ')} ${this.switchDefault})`;
  }

}

module.exports = SwitchStatement;
