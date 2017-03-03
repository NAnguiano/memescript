class ElseIfStatement{
	constructor(expression,body) {
		this.expression = expression;
		this.body = body;
	}

	toString() {
		return `ElseIfStatement (${expression}) ${this.body}`
	}
}