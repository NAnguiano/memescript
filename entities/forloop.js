const Context = require('../semantics/context');

class ForStatement {

  constructor(body, initialization, condition, iterator) {
    this.body = body;
    this.initialization = initialization;
    this.condition = condition;
    this.iterator = iterator;
  }

  analyze(context) {
    const innerContext = new Context({ parent: context, inLoop: true });
    this.initialization.analyze(innerContext);
    const conditionType = this.condition.analyze(innerContext);
    if (!conditionType.isBoolean()) {
      throw new Error('For loop condition must be a boolean.');
    }
    this.iterator.analyze(innerContext);
    this.body.analyze(innerContext);
  }

  toString() {
    return `(For ${this.body} ${this.initialization} ${this.condition} ${this.iterator})`;
  }

}

module.exports = ForStatement;
