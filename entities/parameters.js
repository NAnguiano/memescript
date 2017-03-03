class Parameters {
  constructor(firstParam, middleParams, splatParam) {
    this.firstParam = firstParam;
    this.middleParams = middleParams;
    this.splatParam = splatParam;
  }

  toString() {
    return `(Parameters ${this.firstParam} ${this.middleParams.join(' ')} ${this.splatParam})`;
  }
}

module.exports = Parameters;
