class VarInit {

  constructor(id, value) {
    this.id = id;
    this.value = value;
  }

  analyze(context) {
    context.declare(this.id, this.value); // If we're doing typing, we'd do this as second arg
  }

  toString() {
    return `(VarInit ${this.id} ${this.value})`;
  }

}

module.exports = VarInit;
