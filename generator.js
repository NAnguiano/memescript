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

/* From Ray Toal's PlainScript compiler */
const indentPadding = 2;
let indentLevel = 0;
let log = true; // I'm bad and I should feel bad for doing this.
let generatedString = ''; // Ughhh

function emit(line) {
  if (log) {
    console.log(`${' '.repeat(indentPadding * indentLevel)}${line}`);
  }
  generatedString += `${' '.repeat(indentPadding * indentLevel)}${line}\n`;
}
/* End */

Object.assign(Program.prototype, {
  gen(display = true) {
    log = display;
    generatedString = '';
    this.block.gen();
    return generatedString;
  },
});

Object.assign(Block.prototype, {
  gen() { this.statements.forEach(s => s.gen()); },
});

Object.assign(Body.prototype, {
  gen() { this.statements.forEach(s => s.gen()); },
});

Object.assign(ConstantInitialization.prototype, {
  gen() {
    emit(`const ${this.id}_ = ${this.expression.gen(true)};`);
  },
});

Object.assign(VariableInitialization.prototype, {
  gen(inLoop = false) {
    if (!inLoop) {
      emit(`let ${this.id}_ = ${this.expression.gen(true)};`);
    }
    return `let ${this.id}_ = ${this.expression.gen(true)}`;
  },
});

Object.assign(VariableDeclaration.prototype, {
  gen() {
    emit(`let ${this.id}_;`);
  },
});

Object.assign(ObjectDeclaration.prototype, {
  gen() {
    emit(`class ${this.id}_ {`);

    indentLevel += 1;
    this.constructor.gen();
    this.methods.forEach(m => m.gen());
    indentLevel -= 1;

    emit('}');
  },
});

Object.assign(ObjectConstructor.prototype, {
  gen() {
    emit(`constructor (${this.params.gen()}) {`);

    indentLevel += 1;
    this.body.gen();
    indentLevel -= 1;

    emit('}');
  },
});

Object.assign(ObjectMethods.prototype, {
  gen() {
    emit(`${this.id}_ (${this.parameters.gen()}) {`);

    indentLevel += 1;
    this.body.gen();
    indentLevel -= 1;

    emit('}');
  },
});

Object.assign(ObjectInitialization.prototype, {
  gen() {
    return `new ${this.id}_(${this.args.gen()})`;
  },
});

Object.assign(FunctionDeclaration.prototype, {
  gen() {
    emit(`function ${this.id}_ (${this.parameters.gen()}) {`);

    indentLevel += 1;
    this.body.gen();
    indentLevel -= 1;

    emit('}');
  },
});

Object.assign(WhileLoop.prototype, {
  gen() {
    emit(`while (${this.condition.gen()}) {`);

    indentLevel += 1;
    this.body.gen();
    indentLevel -= 1;

    emit('}');
  },
});

Object.assign(TryCatch.prototype, {
  gen() {
    emit('try {');

    indentLevel += 1;
    this.trybody.gen();
    indentLevel -= 1;

    emit('}');

    emit(`catch (${this.err}_) { `);

    indentLevel += 1;
    this.catchbody.gen();
    indentLevel -= 1;

    emit('}');
  },
});

Object.assign(TryCatchFinally.prototype, {
  gen() {
    emit('try {');

    indentLevel += 1;
    this.trybody.gen();
    indentLevel -= 1;

    emit('}');

    emit(`catch (${this.err}_) { `);

    indentLevel += 1;
    this.catchbody.gen();
    indentLevel -= 1;

    emit('}');

    emit('finally {');
    this.finallybody.gen();
    emit('}');
  },
});

Object.assign(ForLoop.prototype, {
  gen() {
    emit(`for (${this.initialization.gen(true)}; ${this.condition.gen()}; ${this.iterator.gen(true)}) {`);

    indentLevel += 1;
    this.body.gen();
    indentLevel -= 1;

    emit('}');
  },
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
    if (this.block.length > 0) {
      this.block[0].gen();
    }
    emit('break;');
    indentLevel -= 1;
  },
});

Object.assign(SwitchDefault.prototype, {
  gen() {
    emit('default:');

    indentLevel += 1;
    if (this.block.length > 0) {
      this.block[0].gen();
    }
    indentLevel -= 1;
  },
});

Object.assign(IfStatement.prototype, {
  gen() {
    emit(`if (${this.expression.gen()}) {`);

    indentLevel += 1;
    this.body.gen();
    indentLevel -= 1;

    emit('}');

    if (this.elseifStatement.length > 0) {
      this.elseifStatement.forEach(elseifStatement => elseifStatement.gen());
    }
    if (this.elseStatement.length > 0) {
      this.elseStatement[0].gen();
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
  gen(inLoop = false) {
    if (!inLoop) {
      emit(`${this.id}_ = ${this.expression.gen(true)};`);
    }
    return `${this.id}_ = ${this.expression.gen(true)}`;
  },
});

Object.assign(FunctionCall.prototype, {
  gen(inAssign = false) {
    if (!inAssign) {
      emit(`${this.id}_(${this.args.gen()});`);
    }
    return `${this.id}_(${this.args.gen()})`;
  },
});

Object.assign(FunctionArguments.prototype, {
  gen() {
    let args = '';
    this.args.forEach((arg) => {
      args += `${arg.gen()}, `;
    });
    args = args.substring(0, args.length - 2);
    return args;
  },
});

Object.assign(ReturnStatement.prototype, {
  gen() {
    emit(`return ${this.expression.gen()};`);
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

Object.assign(BinaryExpression.prototype, {
  gen() {
    return `${this.left.gen()} ${this.operator} ${this.right.gen()}`;
  },
});

Object.assign(UnaryExpression.prototype, {
  gen() {
    return `${this.prefix}${this.expression.gen()}`;
  },
});

Object.assign(VariableSubscript.prototype, {
  gen() {
    return `${this.variable.gen()}[${this.expression.gen()}]`;
  },
});

Object.assign(VariableSelect.prototype, {
  gen() {
    return `${this.variable.gen()}.${this.id}_`;
  },
});

Object.assign(Parameters.prototype, {
  gen() {
    let para = '';
    this.params.forEach((par) => {
      para += `${par.gen()}, `;
    });
    para = para.substring(0, para.length - 2);
    return para;
  },
});

Object.assign(Param.prototype, {
  gen() {
    return `${this.id}_`;
  },
});

Object.assign(OptionalParam.prototype, {
  gen() {
    return `${this.id}_ = ${this.expression.gen()}`;
  },
});

Object.assign(SplatParam.prototype, {
  gen() {
    return `...${this.id}_`;
  },
});

Object.assign(StringLiteral.prototype, {
  gen() {
    return `${this.value}`;
  },
});


Object.assign(IntegerLiteral.prototype, {
  gen() {
    return parseInt(this.value.toString(), 10);
  },
});

Object.assign(FloatLiteral.prototype, {
  gen() {
    return parseFloat(this.value.toString());
  },
});

Object.assign(BooleanLiteral.prototype, {
  gen() {
    return this.value;
  },
});

Object.assign(Null.prototype, {
  gen() {
    return null;
  },
});

Object.assign(Id.prototype, {
  gen() {
    return `${this.id}_`;
  },
});
