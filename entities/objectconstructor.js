class ObjectConstructor {
  constructor(params, body) {
    this.params = params;
    this.body = body;
  }

  toString() {
    return `ObjConstructor ${this.params} ${this.body}`;
  }
}

module.exports = ObjectConstructor;
