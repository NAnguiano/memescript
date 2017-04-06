const Context = require('../semantics/context');

class WhileLoop {

  constructor(condition, body) {
    this.condition = condition;
    this.body = body;
  }

  analyze(context) {
    const type = this.condition.analyze(context);
    if (!type.isBoolean()) {
      throw new Error('While loop condition must be a boolean.');
    }
    const innerContext = new Context({
      parent: context,
      inLoop: true,
      inFunction: context.inFunction,
    });
    this.body.analyze(innerContext);
  }

  toString() {
    return `(While ${this.condition} ${this.body})`;
  }

}

module.exports = WhileLoop;
