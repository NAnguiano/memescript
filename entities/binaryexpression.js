/* eslint-disable class-methods-use-this */
const Type = require('../semantics/type');

class BinaryExpression {

  constructor(operator, left, right) {
    this.operator = operator;
    this.left = left;
    this.right = right;
  }

  analyze(context) {
    const leftType = this.left.analyze(context);
    const rightType = this.right.analyze(context);
    switch (this.operator) {
      case '*':
      case '/':
      case '%':
      case '-':
        this.requiresNumericOperands(leftType, rightType);
        return this.getMostSpecificType(leftType, rightType);
      case '<=':
      case '<':
      case '>=':
      case '>':
        this.requiresNumericOperands(leftType, rightType);
        return Type.BOOL;
      case '||':
      case '&&':
        this.requiresBooleanOperands(leftType, rightType);
        return Type.BOOL;
      case '===':
      case '==':
      case '!=':
        return Type.BOOL;
      default:
        if (!leftType.isAddableTo(rightType)) {
          throw new Error(`${this.operator} requires either two strings or two numbers.`);
        }
        return (leftType.isNumeric() ? this.getMostSpecificType(leftType, rightType) : Type.STRING);
    }
  }

  toString() {
    return `(BinaryExpression ${this.operator} ${this.left} ${this.right})`;
  }

  requiresNumericOperands(leftType, rightType) {
    if (!leftType.isNumeric() || !rightType.isNumeric()) {
      throw new Error(`${this.operator} requires numeric operands.`);
    }
  }

  requiresBooleanOperands(leftType, rightType) {
    if (!rightType.isBoolean() || !leftType.isBoolean()) {
      throw new Error(`${this.operator} requires boolean operands.`);
    }
  }

  getMostSpecificType(leftType, rightType) {
    return (leftType.type === 'float' || rightType.type === 'float') ? Type.FLOAT : Type.INT;
  }

  optimize() {
    this.left.optimize();
    this.right.optimize();
    return this;
  }

}

module.exports = BinaryExpression;
