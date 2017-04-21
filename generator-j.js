const Program = require('./entities/program');
const Block = require('./entities/block');
// const Body = require('./entities/body');
// const ConstantInitialization = require('./entities/constantinitialization');
// const VariableInitialization = require('./entities/variableinitialization');
// const VariableDeclaration = require('./entities/variabledeclaration');
// const ObjectDeclaration = require('./entities/objectdeclaration');
// const ObjectConstructor = require('./entities/objectconstructor');
// const ObjectMethods = require('./entities/objectmethods');
// const ObjectInitialization = require('./entities/objectinitialization');
// const FunctionDeclaration = require('./entities/functiondeclaration');
// const WhileLoop = require('./entities/whileloop');
// const TryCatch = require('./entities/trycatch');
// const TryCatchFinally = require('./entities/trycatchfinally');
// const ForLoop = require('./entities/forloop');
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
// const BinaryExpression = require('./entities/binaryexpression');
// const UnaryExpression = require('./entities/unaryexpression');
// const VariableSubscript = require('./entities/variablesubscript');
// const VariableSelect = require('./entities/variableselect');
// const Parameters = require('./entities/parameters');
// const Param = require('./entities/param');
// const OptionalParam = require('./entities/optionalparam');
// const SplatParam = require('./entities/splatparam');
// const StringLiteral = require('./entities/stringliteral');
// const IntegerLiteral = require('./entities/integerliteral');
// const FloatLiteral = require('./entities/floatliteral');
// const BooleanLiteral = require('./entities/booleanliteral');
// const Null = require('./entities/null');
// const Id = require('./entities/id');

/* From Ray Toal's PlainScript compiler */
const indentPadding = 2;
let indentLevel = 0;

function emit(line) {
  console.log(`${' '.repeat(indentPadding * indentLevel)}${line}`);
}
/* End */

Object.assign(Program.prototype, {
  gen() { this.block.gen(); },
});

Object.assign(Block.prototype, {
  gen() { this.statements.forEach(s => s.gen()); },
});

Object.assign(SwitchStatement.prototype, {
  gen() {
    emit(`switch (${this.expression.gen()}) {`);

    indentLevel += 1;
    this.switchCases.forEach(switchCase => switchCase.gen());
    this.switchDefault.gen();
    indentLevel -= 1;

    emit('}');
  },
});

Object.assign(SwitchCase.prototype, {
  gen() {
    emit(`case ${this.literal}:`);

    indentLevel += 1;
    this.block.gen();
    indentLevel -= 1;

    emit('break;');
  },
});

Object.assign(SwitchDefault.prototype, {
  gen() {
    emit('default:');

    indentLevel += 1;
    this.block.gen();
    indentLevel -= 1;
  },
});

Object.assign(IfStatement.prototype, {
  gen() {
    emit(`if (${this.expression.gen()}) {`);

    indentLevel += 1;
    this.block.gen();
    indentLevel -= 1;

    emit('}');

    if (this.elseifStatement.length > 0) {
      this.elseifStatement.forEach(elseifStatement => elseifStatement.gen());
    }
    if (this.elseStatement.length > 0) {
      this.elseStatement.gen();
    }
  },
});

Object.assign(ElseIfStatement.prototype, {
  gen() {
    emit(`else if(${this.expression.gen()}) {`);

    indentLevel += 1;
    this.body.gen();
    indentLevel -= 1;

    emit('}');
  },
});

Object.assign(ElseStatement.prototype, {
  gen() {
    emit('else {');

    indentLevel += 1;
    this.body.gen();
    indentLevel -= 1;

    emit('}');
  },
});

Object.assign(Assignment.prototype, {
  gen() { emit(`${this.id.gen()} = ${this.expression.gen()};`); },
});

Object.assign(FunctionCall.prototype, {
  gen() { emit(`${this.id.gen()}(${this.args.gen()});`); },
});

Object.assign(FunctionArguments.prototype, {
  gen() {
    let args = '';
    this.args.forEach((arg) => {
      args += `${arg}, `;
    });
    args = args.substring(0, args.length - 2);
    return args;
  },
});

Object.assign(ReturnStatement.prototype, {
  gen() {
    emit(`Return ${this.expression.gen()}`);
  },
});

Object.assign(PrintStatement.prototype, {
  gen() {
    if (this.error) {
      emit(`console.error(${this.expression.gen()});`);
    } else {
      emit(`console.log(${this.expression.gen()});`);
    }
  },
});

Object.assign(Alert.prototype, {
  gen() { emit(`alert(${this.expression.gen()});`); },
});
