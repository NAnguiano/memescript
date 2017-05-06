const Type = require('../semantics/type');
const BooleanLiteral = require('./booleanliteral')
const FloatLiteral = require('./floatliteral')
const IntLiteral = require('./integerliteral')

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
    if (this.prefix === 'not' && this.expression instanceof BooleanLiteral) {
      return BooleanLiteral(!this.expression.value);
    } else if (this.prefix === '-' && this.expression instanceof FloatLiteral) {
      return new FloatLiteral(-this.expression.value);
    } else if (this.prefix === '-' && this.expression instanceof IntLiteral){
      return new IntLiteral(-this.expression.value);
    }
    return this;
  }

}

module.exports = UnaryExpression;
