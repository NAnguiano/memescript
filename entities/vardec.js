class vardec{
	
	constructor(id) {
		this.id = id;
	}

	toString() {
		return `(Var ${this.id})`;
  	}
}
module.exports = vardec;