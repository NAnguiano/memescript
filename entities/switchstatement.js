class SwitchStatement {

  constructor(expression, cases, defaultCase) {

    this.expression = expression;
    this.cases = cases;
    this.defaultCase = defaultCase;

  }

  toString() {
  
    return `Switch ${this.expression} ${this.cases} ${this.defaultCase}`;  

  }

}
