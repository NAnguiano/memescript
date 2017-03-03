class VarDec{
	
	constructor(id) {
		this.id = id;
	}

	toString() {
		return `(VarDec ${this.id})`;
  	}
}
module.exports = VarDec;