class SwitchDefault {

  constructor(block) {
    this.block = block;
  }

  analyze(context) {
    if (this.block.length > 0) this.block[0].analyze(context);
  }

  toString() {
    return `SwitchDefaut ${this.block}`;
  }

}

module.exports = SwitchDefault;
