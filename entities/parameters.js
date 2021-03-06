class Parameters {
  constructor(firstParam, middleParams) {
    this.params = firstParam.concat((middleParams.length > 0) ? middleParams[0] : middleParams);
  }

  analyze(context) {
    this.params.forEach(p => p.analyze(context));
    for (let i = 0; i < this.params.length - 1; i += 1) {
      if (this.params[i].type === 'optional' && this.params[i + 1].type === 'required') {
        throw new Error('Optional parameters must come after required parameters.');
      } else if (this.params[i].type === 'splat') {
        throw new Error('Splat parameters must come at the end of the function list.');
      }
    }
    this.length = this.params.length;
  }

  toString() {
    return `(Parameters ${this.params.join(' ')})`;
  }

  optimize() {
    this.params.map(p => p.optimize()).filter(p => p !== null);
  }
}

module.exports = Parameters;
