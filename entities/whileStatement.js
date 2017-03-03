class WhileStatement {

  constructor(condition, body) {
    this.condition = condition;
    this.body = body;
  }

  toString() {
    return `(While ${this.condition} ${this.body})`;
  }

}

module.exports = WhileStatement;
