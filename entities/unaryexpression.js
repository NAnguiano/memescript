const Type = require('../semantics/type');

class UnaryExpression {

  constructor(prefix, expression) {
    this.prefix = prefix;
    this.expression = expression;
  }

  analyze(context) {
    const type = this.expression.analyze(context);
    if (this.prefix === '!') {
      if (!type.isBoolean()) {
        throw new Error('! operator requires a boolean operand.');
      }
      return Type.BOOL;
    }
    if (!type.isNumeric()) {
      throw new Error('- operator requires a numeric operand.');
    }
    return type;
  }

  toString() {
    return `(UnaryExpression ${this.prefix} ${this.expression})`;
  }

  optimize() {
    this.expression = this.expression.optimize();
    return this;
  }

}

module.exports = UnaryExpression;
