/*
  Modified from https://github.com/rtoal/iki-compiler/blob/master/parser.coffee
  Thanks Dr. Toal!
*/

const Program = require('./entities/program');
const Block = require('./entities/block');
const ConstantInitialization = require('./entities/constantinitialization');
const VariableInitialization = require('./entities/variableinitialization');
const VariableDeclaration = require('./entities/variabledeclaration');
const ObjectDeclaration = require('./entities/objectdeclaration');
const ObjectConstructor = require('./entities/objectconstructor');
const ObjectMethods = require('./entities/objectmethods');
const FunctionDeclaration = require('./entities/functiondeclaration');
const WhileStatement = require('./entities/whilestatement');
const TryCatchStatement = require('./entities/trycatchstatement');
const TryCatchFinallyStatement = require('./entities/trycatchfinallystatement');
const ForLoop = require('./entities/forstatement');
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
const ErrorStatement = require('./entities/printerror');
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

const error = require('./error');
const ohm = require('ohm-js');
const fs = require('fs');

const grammar = ohm.grammar(fs.readFileSync('./MemeScript.ohm'));

/* eslint-disable no-unused-vars, no-new, arrow-body-style, no-underscore-dangle */
const semantics = grammar.createSemantics().addOperation('ast', {
  Program: (b) => {
    return new Program(b.ast());
  },
  Block: (s) => {
    return new Block(s.ast());
  },
  Body: (b1, b, b2) => {
    return b.ast();
  },
  ConstInit: (o, i, _, e, s) => {
    return new ConstantInitialization(i.sourceString, e.ast());
  },
  VarInit: (e, i, _, v, s) => {
    return new VariableInitialization(i.sourceString, v.ast());
  },
  VarDec: (e, i, _) => {
    return new VariableDeclaration(i.sourceString);
  },
  ObjDec: (w, i, rcb, c, o, lcb) => {
    return new ObjectDeclaration(i.sourceString, c.ast(), o.ast());
  },
  ObjConst: (s, lp, p, rp, b) => {
    return new ObjectConstructor(p.ast(), b.ast());
  },
  ObjMethods: (s, i, lp, p, rp, b) => {
    return new ObjectMethods(i.sourceString, p.ast(), b.ast());
  },
  FunDec: (y, i, rp, p, lp, _, b) => {
    return new FunctionDeclaration(i.sourceString, p.ast(), b.ast());
  },
  Assignment: (i, q, e, _) => {
    return new Assignment(i.sourceString, e.ast());
  },
  Call: (i, rp, a, lp, _) => {
    return new FunctionCall(i.sourceString, a.ast());
  },
  Args: (e, c, r) => {
    return new FunctionArguments(e.ast(), r.ast());
  },
  Var_subscript: (v, rb, e, _) => {
    return new VariableSubscript(v.ast(), e.ast());
  },
  Var_select: (v, p, i) => {
    return new VariableSelect(v.ast(), i.sourceString);
  },
  Switch: (s, p1, e, p2, b1, c, d, b2) => {
    return new SwitchStatement(e.ast(), c.ast(), d.ast());
  },
  SwitchCase: (intro, l, b1, b, end, b2) => {
    return new SwitchCase(l.ast(), b.ast());
  },
  SwitchDefault: (intro, b1, b, end, b2) => {
    return new SwitchDefault(b.ast());
  },
  If: (intro, p1, e, p2, segue, b, elseif, elseStmnt) => {
    return new IfStatement(e.ast(), b.ast(), elseif.ast(), elseStmnt.ast());
  },
  ElseIf: (intro, p1, e, p2, b) => {
    return new ElseIfStatement(e.ast(), b.ast());
  },
  Else: (intro, b) => {
    return new ElseStatement(b.ast());
  },
  TryCatch: (intro, trybody, segue, lp, err, rp, catchbody) => {
    return new TryCatchStatement(trybody.ast(), err.ast(), catchbody.ast());
  },
  TryCatchFinally: (intro, trybody, segue, lp, err, rp, cb, segue2, finallybody) => {
    return new TryCatchFinallyStatement(trybody.ast(), err.ast(), cb.ast(), finallybody.ast());
  },
  While: (y, rp, e, lp, _, b) => {
    return new WhileStatement(e.ast(), b.ast());
  },
  For: (o, b, w, lp, v, e, s, i, rp) => {
    return new ForLoop(b.ast(), v.ast(), e.ast(), i.ast());
  },
  Return: (i, e, _) => {
    return new ReturnStatement(e.ast());
  },
  Print: (d, lp, e, rp, s) => {
    return new PrintStatement(e.ast());
  },
  Error: (c, lp, e, rp, s) => {
    return new ErrorStatement(e.ast());
  },
  Alert: (h, lp, e, rp, s) => {
    return new Alert(e.ast());
  },
  Exp_binary: (l, _, r) => {
    return new BinaryExpression(l.ast(), '||', r.ast());
  },
  Exp1_binary: (l, _, r) => {
    return new BinaryExpression(l.ast(), '&&', r.ast());
  },
  Exp2_binary: (l, o, r) => {
    return new BinaryExpression(l.ast(), o.sourceString, r.ast());
  },
  Exp3_binary: (l, o, r) => {
    return new BinaryExpression(l.ast(), o.sourceString, r.ast());
  },
  Exp4_binary: (l, o, r) => {
    return new BinaryExpression(l.ast(), o.sourceString, r.ast());
  },
  Exp5_unary: (p, e) => {
    return new UnaryExpression(p.sourceString, e.ast());
  },
  Exp6_parens: (l, e, r) => {
    return e.ast();
  },
  Params: (p1, c, pm) => {
    return new Parameters(p1.ast(), pm.ast());
  },
  Param: (i) => {
    return new Param(i.sourceString);
  },
  OptionalParam: (i, q, e) => {
    return new OptionalParam(i.sourceString, e.ast());
  },
  SplatParam: (i, _) => {
    return new SplatParam(i.sourceString);
  },
  Literal_null: (s) => {
    return new Null(s);
  },
  Literal_str: (q, s, _) => {
    const sourceString = s._baseInterval.sourceString;
    const startIndex = s._baseInterval.startIdx;
    const endIndex = s._baseInterval.endIdx;
    return new StringLiteral(sourceString.substring(startIndex, endIndex));
  },
  Literal_int: (i) => {
    const sourceString = i._baseInterval.sourceString;
    const startIndex = i._baseInterval.startIdx;
    const endIndex = i._baseInterval.endIdx;
    return new IntegerLiteral(sourceString.substring(startIndex, endIndex));
  },
  Literal_float: (f1, p, f2) => {
    const sourceString = f1._baseInterval.sourceString;
    const startIndex = f1._baseInterval.startIdx;
    const endIndex = f1._baseInterval.endIdx;
    return new FloatLiteral(sourceString.substring(startIndex, endIndex));
  },
  Literal_bool: (b) => {
    return new BooleanLiteral(b.sourceString);
  },
  id: (l, r) => {
    const sourceString = r._baseInterval.sourceString;
    const startIndex = r._baseInterval.startIdx;
    const endIndex = r._baseInterval.endIdx;
    return `${sourceString.substring(startIndex, endIndex)}`;
  },
});
/* eslint-enable no-unused-vars, no-new, arrow-body-style, no-underscore-dangle */

const parse = (text) => {
  const match = grammar.match(text);
  if (match.succeeded()) {
    return semantics(match).ast();
  }
  return error(match.message);
};

module.exports = parse;
