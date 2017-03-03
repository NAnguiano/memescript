class BinaryExpression {

  constructor(left, operator, right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  toString() {
    return `(BinaryExpression ${this.left} ${this.operator} ${this.right})`;
  }

}

module.exports = BinaryExpression;
