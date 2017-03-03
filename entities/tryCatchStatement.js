class TryCatchStatement{

	constructor(body){
        this.body = body;
	}

	toString() {
		return '(Try ${this.body} Catch ${this.body} )';
	}

}

module.exports = TryCatchStatement;

