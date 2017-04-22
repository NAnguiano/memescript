const Program = require('./entities/program');
const Block = require('./entities/block');
const Body = require('./entities/body');
const ConstantInitialization = require('./entities/constantinitialization');
const VariableInitialization = require('./entities/variableinitialization');
const VariableDeclaration = require('./entities/variabledeclaration');
const ObjectDeclaration = require('./entities/objectdeclaration');
const ObjectConstructor = require('./entities/objectconstructor');
const ObjectMethods = require('./entities/objectmethods');
const ObjectInitialization = require('./entities/objectinitialization');
const FunctionDeclaration = require('./entities/functiondeclaration');
const WhileLoop = require('./entities/whileloop');
const TryCatch = require('./entities/trycatch');
const TryCatchFinally = require('./entities/trycatchfinally');
const ForLoop = require('./entities/forloop');
const SwitchStatement = require('./entities/switchstatement');
const SwitchCase = require('./entities/switchcase');
const SwitchDefault = require('./entities/switchdefault');
const IfStatement = require('./entities/ifstatement');
const ElseIfStatement = require('./entities/elseifstatement');
const ElseStatement = require('./entities/elsestatement');
const Assignment = require('./entities/assignment');
const FunctionCall = require('./entities/functioncall');
const FunctionArguments = require('./entities/functionarguments');
const ReturnStatement = require('./entities/returnstatement');
const PrintStatement = require('./entities/printstatement');
const Alert = require('./entities/alert');
const BinaryExpression = require('./entities/binaryexpression');
const UnaryExpression = require('./entities/unaryexpression');
const VariableSubscript = require('./entities/variablesubscript');
const VariableSelect = require('./entities/variableselect');
const Parameters = require('./entities/parameters');
const Param = require('./entities/param');
const OptionalParam = require('./entities/optionalparam');
const SplatParam = require('./entities/splatparam');
const StringLiteral = require('./entities/stringliteral');
//const IntegerLiteral = require('./entities/integerliteral');
const FloatLiteral = require('./entities/floatliteral');
const BooleanLiteral = require('./entities/booleanliteral');
const Null = require('./entities/null');
const Id = require('./entities/id');


function emit(line) {
  console.log(line);
}

Object.assign(Program.prototype, {

  gen() { return this.block.gen(); }

});

Object.assign(Block.prototype, {
  
  gen() { this.statements.forEach(s => s.gen(); }

});

Object.assign(BinaryExpression.prototype, {
  gen() {
    emit (`${this.left.gen()} ${this.operator.gen()} ${this.right.gen()}`);
  },
});

Object.assign(UnaryExpression.prototype, {
  gen() {
    emit(`${this.prefix.gen()} ${this.expression.gen()}`);
  },
});

Object.assign(VariableSubscript.prototype, {
  gen() {
    emit(`${this.variable.gen()} [ ${this.expression.gen()} ]`);
  },
});

Object.assign(VariableSelect.prototype, {
  gen() {
    emit(`${this.variable.gen()} . ${this.id.gen()}`);
  },
});

Object.assign(Parameters.prototype, {
  gen() {
    emit('(')
    let para = '';
    this.para.forEach((para) => {
      para += `${para}, `;
    });
    para = para.substring(0,para.length - 1);
    return para
    emit(')')
  },
});

Object.assign(Param.prototype, {
  gen(){
    emit(`${this.id.gen()}`)
  },
});

Object.assign(OptionalParam.prototype, {
  gen(){
    emit(`${this.id.gen()} = ${this.expression.gen()}`)
  },
});

Object.assign(SplatParam.prototype, {
  gen(){
    emit(`${this.id.gen()}`)
  },
});

Object.assign(StringLiteral.prototype, {
  gen(){
    emit(`${this.value.gen()}`)
  },
});

Object.assign(FloatLiteral.prototype, {
  gen(){
    emit(`${this.value.gen()}`)
  },
});

Object.assign(BooleanLiteral.prototype, {
  gen(){
    emit(`${this.value.gen()}`)
  },
});

Object.assign(Null.prototype, {
  gen(){
   emit('null') 
  },
});

Object.assign(Id.prototype,{
  gen(){
    emit(`${this.id.gen()}`)
  }
})