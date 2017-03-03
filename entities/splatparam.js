class SplatParam {
  constructor(id) {
    this.id = id;
  }

  toString() {
    return `(SplatParam ${this.id})`;
  }
}

module.exports = SplatParam;
