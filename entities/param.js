class Param {
  constructor(id) {
    this.id = id;
  }

  toString() {
    return `(Param ${this.id})`;
  }
}

module.exports = Param;
