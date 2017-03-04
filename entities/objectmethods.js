class ObjectMethods {
  constructor(id, params, body) {
    this.id = id;
    this.params = params;
    this.body = body;
  }

  toString() {
    return `ObjMethods ${this.id} ${this.params} ${this.body}`;
  }
}

module.exports = ObjectMethods;
