class Parameters {
  constructor(firstParam, middleParams, splatParam) {
    this.firstParam = firstParam;
    this.middleParams = middleParams;
    this.splatParam = splatParam;
  }

  toString() {
    return `(Parameters ${this.firstParam} ${this.middleParams[0].join(' ')} ${this.splatParam})`;
  }
}

module.exports = Parameters;
