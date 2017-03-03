class ConstDec{
	
	constructor(id) {
		this.id = id;
	}

	toString() {
		return `(ConstDec ${this.id})`;
  	}
}
module.exports = ConstDec;