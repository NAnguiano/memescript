class IfStatement {

  constructor(expression, body, elseifStatement, elseStatement) {
    this.expression = expression;
    this.body = body;
    this.elseifStatement = elseifStatement;
    this.elseStatement = elseStatement;
  }

  analyze(context) {
    // For semantics, we're not going to care what path we take. We'll declare everything.
    // It would be a run-time error if a user tried to instantiate something that wasn't
    // already declared.
    const type = this.expression.analyze(context);
    if (!type.isBoolean()) {
      throw new Error('If statement accepts only boolean expressions.');
    }
    this.body.analyze(context);
    if (this.elseifStatement.length > 0) {
      this.elseifStatement.forEach(elif => elif.analyze(context));
    }
    if (this.elseStatement.length > 0) {
      this.elseStatement[0].analyze(context);
    }
  }

  toString() {
    return `(IfStatement ${this.expression} ${this.body} ${this.elseifStatement.join(' ')} ${this.elseStatement})`;
  }

  optimize() {
    // Check if the if condition will always amount to false. Also check if there are any else ifs, and if there is an else.
  }
}

module.exports = IfStatement;
