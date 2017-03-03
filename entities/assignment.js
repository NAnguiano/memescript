class Assignment {

  constructor(id, expression) {
    this.id = id;
    this.expression = expression;
  }

  toString() {
    return `(Assignment ${this.id} ${this.expression})`;
  }

}

module.exports = Assignment;
