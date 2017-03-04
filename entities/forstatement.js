class ForStatement {

  constructor(body, variable, expression, iterator) {
    this.body = body;
    this.variable = variable;
    this.expression = expression;
    this.iterator = iterator;
  }

  toString() {
    return `(For ${this.body} ${this.variable} ${this.expression} ${this.iterator})`;
  }

}

module.exports = ForStatement;
