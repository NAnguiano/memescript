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
const IntegerLiteral = require('./entities/integerliteral');
const FloatLiteral = require('./entities/floatliteral');
const BooleanLiteral = require('./entities/booleanliteral');
const Null = require('./entities/null');
const Id = require('./entities/id');

Object.assign(Program.prototype, {

  gen() { return this.block.gen(); }

});

Object.assign(Block.prototype, {
  
  gen() { this.statements.forEach(s => s.gen(); }

});