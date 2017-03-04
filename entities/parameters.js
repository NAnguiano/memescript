class Parameters {
  constructor(firstParam, middleParams, splatParam) {
    this.firstParam = firstParam;
    if (middleParams[0] && middleParams[0].length > 0) {
      this.middleParams = middleParams[0];
    } else {
      this.middleParams = middleParams;
    }
    this.splatParam = splatParam;
  }

  toString() {
    return `(Parameters ${this.firstParam} ${this.middleParams.join(' ')} ${this.splatParam})`;
  }
}

module.exports = Parameters;
