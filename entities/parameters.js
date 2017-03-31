class Parameters {
  constructor(firstParam, middleParams) {
    this.params = firstParam.concat(middleParams[0]);
  }

  toString() {
    return `(Parameters ${this.params.join(' ')})`;
  }
}

module.exports = Parameters;
