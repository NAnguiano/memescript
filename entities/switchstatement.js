class SwitchStatement {

  constructor(expression, switchCases, switchDefault) {
    this.expression = expression;
    this.switchCases = switchCases;
    this.switchDefault = switchDefault;
  }

  analyze(context) {
    this.expression.analyze(context);
    this.switchCases.forEach(sc => sc.analyze(context));
    this.switchDefault.analyze(context);
  }

  toString() {
    return `(Switch ${this.expression} ${this.switchCases.join(' ')} ${this.switchDefault})`;
  }

  optimize() {
    this.expression = this.expression.optimize();
    if (this.switchCases.length > 0) this.switchCases.map(c => c.optimize()).filter(c => c !== null);
    if (this.switchDefault !== null) this.switchDefault = this.switchDefault.optimize();
    return this;
  }

}

module.exports = SwitchStatement;
