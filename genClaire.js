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
// const SwitchStatement = require('./entities/switchstatement');
// const SwitchCase = require('./entities/switchcase');
// const SwitchDefault = require('./entities/switchdefault');
// const IfStatement = require('./entities/ifstatement');
// const ElseIfStatement = require('./entities/elseifstatement');
// const ElseStatement = require('./entities/elsestatement');
// const Assignment = require('./entities/assignment');
// const FunctionCall = require('./entities/functioncall');
// const FunctionArguments = require('./entities/functionarguments');
// const ReturnStatement = require('./entities/returnstatement');
// const PrintStatement = require('./entities/printstatement');
// const Alert = require('./entities/alert');
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

Object.assign(Body.prototype, {
  gen() { this.statements.forEach(s => s.gen()); },
});

Object.assign(ConstantInitialization.prototype, {
  gen() {
    emit(`const ${this.id.gen()} = ${this.expression.gen()};`);
  },
});

Object.assign(VariableInitialization.prototype, {
  gen() {
    emit(`var ${this.id.gen()} = ${this.expression.gen()};`);
  },
});

Object.assign(VariableDeclaration.prototype, {
  gen() {
    emit(`var ${this.id.gen()};`);
  },
});

Object.assign(ObjectDeclaration.prototype, {
  gen() {
    emit(`class ${this.id.gen()} {`);

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
    emit(`${this.id.gen()} (${this.params.gen()}) {`);

    indentLevel += 1;
    this.body.gen();
    indentLevel -= 1;

    emit('}');
  },
});

Object.assign(ObjectInitialization.prototype, {
  gen() {
    emit(`new ${this.id.gen()} (${this.args.gen()})`);
  },
});

Object.assign(FunctionDeclaration.prototype, {
  gen() {
    emit(`func ${this.id.gen()} (${this.params.gen()}) {`);

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

    emit(` catch (${this.err.gen()}) { `);

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

    emit(` catch (${this.err.gen()}) { `);

    indentLevel += 1;
    this.catchbody.gen();
    indentLevel -= 1;

    emit('}');

    emit(' finally {');
    this.finallybody.gen();
    emit('}');
  },
});

Object.assign(ForLoop.prototype, {
  gen() {
    emit(`for (${this.initialization.gen()}; ${this.condition.gen()}; ${this.iterator.gen()}) {`);

    indentLevel += 1;
    this.body.gen();
    indentLevel -= 1;

    emit('}');
  },
});
