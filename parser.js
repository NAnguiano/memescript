/*
  Modified from https://github.com/rtoal/iki-compiler/blob/master/parser.coffee
  Thanks Dr. Toal!
*/

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

const error = require('./error');
const ohm = require('ohm-js');
const fs = require('fs');

const grammar = ohm.grammar(fs.readFileSync('./MemeScript.ohm'));

// In some cases, using sourceString will not return the proper value. We'll use this
// to get it accurately.
/* eslint-disable no-underscore-dangle */
const getProperValue = (v) => {
  const sourceString = v._baseInterval.sourceString;
  const startIndex = v._baseInterval.startIdx;
  const endIndex = v._baseInterval.endIdx;
  return sourceString.substring(startIndex, endIndex);
};
/* eslint-enable no-underscore-dangle */

/* eslint-disable no-unused-vars, no-new, arrow-body-style */
const semantics = grammar.createSemantics().addOperation('ast', {
  Program: (block) => {
    return new Program(block.ast());
  },
  Block: (stmnt) => {
    return new Block(stmnt.ast());
  },
  Stmnt_funcall: (call, _) => {
    return call.ast();
  },
  Stmnt_assign: (assign, _) => {
    return assign.ast();
  },
  Body: (_1, block, _2) => {
    return new Body(block.ast());
  },
  ConstInit: (_1, id, _2, exp, _3) => {
    return new ConstantInitialization(id.sourceString, exp.ast());
  },
  VarInit: (_1, id, _2, exp, _3) => {
    return new VariableInitialization(id.sourceString, exp.ast());
  },
  VarDec: (_1, id, _2) => {
    return new VariableDeclaration(id.sourceString);
  },
  ObjDec: (_1, id, _2, objconst, objmethods, _3) => {
    return new ObjectDeclaration(id.sourceString, objconst.ast(), objmethods.ast());
  },
  ObjConst: (_1, _2, params, _3, body) => {
    return new ObjectConstructor(params.ast(), body.ast());
  },
  ObjMethods: (_1, id, _2, params, _3, body) => {
    return new ObjectMethods(id.sourceString, params.ast(), body.ast());
  },
  ObjInit: (_1, id, _2, params, _3) => {
    return new ObjectInitialization(id.sourceString, params.ast());
  },
  FunDec: (_1, id, _2, params, _3, _4, body) => {
    return new FunctionDeclaration(id.sourceString, params.ast(), body.ast());
  },
  Assignment: (id, _, exp) => {
    return new Assignment(id.sourceString, exp.ast());
  },
  Call: (id, _1, args, _2) => {
    return new FunctionCall(id.sourceString, args.ast());
  },
  Args: (exp, _, exprest) => {
    return new FunctionArguments(exp.ast(), exprest.ast());
  },
  Var_subscript: (var_, _1, exp, _2) => {
    return new VariableSubscript(var_.ast(), exp.ast());
  },
  Var_select: (var_, _, id) => {
    return new VariableSelect(var_.ast(), id.sourceString);
  },
  Var: (expr) => {
    return expr.ast();
  },
  Switch: (_1, _2, exp, _3, _4, switchCase, switchDefault, _5) => {
    return new SwitchStatement(exp.ast(), switchCase.ast(), switchDefault.ast());
  },
  SwitchCase: (_1, literal, _2, block, _3, _4) => {
    return new SwitchCase(literal.ast(), block.ast());
  },
  SwitchDefault: (_1, _2, block, _3, _4) => {
    return new SwitchDefault(block.ast());
  },
  If: (_1, _2, exp, _3, _4, body, elseif, else_) => {
    return new IfStatement(exp.ast(), body.ast(), elseif.ast(), else_.ast());
  },
  ElseIf: (_1, _2, exp, _3, body) => {
    return new ElseIfStatement(exp.ast(), body.ast());
  },
  Else: (_, body) => {
    return new ElseStatement(body.ast());
  },
  TryCatch: (_1, tryBody, _2, _3, id, _4, catchBody) => {
    return new TryCatch(tryBody.ast(), id.sourceString, catchBody.ast());
  },
  TryCatchFinally: (_1, trybody, _2, _3, id, _4, catchBody, _5, finallyBody) => {
    return new TryCatchFinally(trybody.ast(), id.sourceString, catchBody.ast(), finallyBody.ast());
  },
  While: (_1, _2, exp, _3, _4, body) => {
    return new WhileLoop(exp.ast(), body.ast());
  },
  For: (_1, body, _2, _3, varInit, exp, _4, assignment, _5) => {
    return new ForLoop(body.ast(), varInit.ast(), exp.ast(), assignment.ast());
  },
  Return: (_1, exp, _2) => {
    return new ReturnStatement(exp.ast());
  },
  Print: (_1, _2, exp, _3, _4) => {
    return new PrintStatement(exp.ast());
  },
  Error: (_1, _2, exp, _3, _4) => {
    return new PrintStatement(exp.ast(), true);
  },
  Alert: (_1, _2, exp, _3, _4) => {
    return new Alert(exp.ast());
  },
  Exp_binary: (leftExp, _, rightExp) => {
    return new BinaryExpression('||', leftExp.ast(), rightExp.ast());
  },
  Exp1_binary: (leftExp, _, rightExp) => {
    return new BinaryExpression('&&', leftExp.ast(), rightExp.ast());
  },
  Exp2_binary: (leftExp, operator, rightExp) => {
    return new BinaryExpression(operator.sourceString, leftExp.ast(), rightExp.ast());
  },
  Exp3_binary: (leftExp, operator, rightExp) => {
    return new BinaryExpression(operator.sourceString, leftExp.ast(), rightExp.ast());
  },
  Exp4_binary: (leftExp, operator, rightExp) => {
    return new BinaryExpression(operator.sourceString, leftExp.ast(), rightExp.ast());
  },
  Exp5_unary: (prefix, exp) => {
    return new UnaryExpression(prefix.sourceString, exp.ast());
  },
  Exp6_parens: (_1, exp, _2) => {
    return exp.ast();
  },
  Params: (param, _, paramRest) => {
    return new Parameters(param.ast(), paramRest.ast());
  },
  Param: (id) => {
    return new Param(id.sourceString);
  },
  OptionalParam: (id, _, exp) => {
    return new OptionalParam(id.sourceString, exp.ast());
  },
  SplatParam: (id, _) => {
    return new SplatParam(id.sourceString);
  },
  Literal_null: (null_) => {
    return new Null();
  },
  Literal_str: (_1, string, _2) => {
    return new StringLiteral(getProperValue(string));
  },
  Literal_int: (int) => {
    return new IntegerLiteral(getProperValue(int));
  },
  Literal_float: (float, _1, _2) => {
    // You can get the entire float value from just the first part.
    return new FloatLiteral(getProperValue(float));
  },
  Literal_bool: (bool) => {
    return new BooleanLiteral(bool.sourceString);
  },
  id: (_, rest) => {
    return new Id(`${getProperValue(rest)}`);
  },
});
/* eslint-enable no-unused-vars, no-new, arrow-body-style */

const parse = (text) => {
  const match = grammar.match(text);
  if (match.succeeded()) {
    return semantics(match).ast();
  }
  return error(match.message);
};

module.exports = parse;
