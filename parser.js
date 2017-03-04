/*
  Modified from https://github.com/rtoal/iki-compiler/blob/master/parser.coffee
  Thanks Dr. Toal!
*/

const Program = require('./entities/program.js');
const Block = require('./entities/block.js');
const ConstantDeclaration = require('./entities/constantdeclaration.js');
const VariableDeclaration = require('./entities/variabledeclaration.js');
const ObjectDeclaration = require('./entities/objectdeclaration.js');
const ObjectConstructor = require('./entities/objectconstructor.js');
const ObjectMethods = require('./entities/objectmethods.js');
const FunctionDeclaration = require('./entities/functiondeclaration.js');
const WhileStatement = require('./entities/whilestatement.js');
const TryCatchStatement = require('./entities/trycatchstatement.js');
const TryCatchFinallyStatement = require('./entities/trycatchfinallystatement.js');
const ForLoop = require('./entities/forstatement.js');
const SwitchStatement = require('./entities/switchstatement.js');
const SwitchCase = require('./entities/switchcase.js');
const SwitchDefault = require('./entities/switchdefault.js');
const IfStatement = require('./entities/ifstatement.js');
const ElseIfStatement = require('./entities/elseifstatement.js');
const ElseStatement = require('./entities/elsestatement.js');
const Literal = require('./entities/literal.js');
const Assignment = require('./entities/assignment.js');
const FunctionCall = require('./entities/functioncall.js');
const FunctionArguments = require('./entities/functionarguments.js');
const ReturnStatement = require('./entities/returnstatement.js');
const PrintStatement = require('./entities/printstatement.js');
const BinaryExpression = require('./entities/binaryexpression.js');
const UnaryExpression = require('./entities/unaryexpression.js');
const VariableSubscript = require('./entities/variablesubscript.js');
const VariableSelect = require('./entities/variableselect.js');
const Parameters = require('./entities/parameters.js');
const Param = require('./entities/param.js');
const OptionalParam = require('./entities/optionalparam.js');
const SplatParam = require('./entities/splatparam.js');
const StringLiteral = require('./entities/stringliteral.js');
const IntegerLiteral = require('./entities/integerliteral.js');
const FloatLiteral = require('./entities/floatliteral.js');
const BooleanLiteral = require('./entities/booleanliteral.js');

const error = require('./error.js');
const ohm = require('ohm-js');
const fs = require('fs');

const grammar = ohm.grammar(fs.readFileSync('./MemeScript.ohm'));

/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
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
  ConstDec: (o, i, _) => {
    return new ConstantDeclaration(i.sourceString);
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
  Literal: (x) => {
    return new Literal(x.sourceString);
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
  TryCatch: (intro, trybody, segue, catchbody) => {
    return new TryCatchStatement(trybody.ast(), catchbody.ast());
  },
  TryCatchFinally: (intro, trybody, segue, catchbody, segue2, finallybody) => {
    return new TryCatchFinallyStatement(trybody.ast(), catchbody.ast(), finallybody.ast());
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
  Params: (p1, c, p2, c2, s) => {
    return new Parameters(p1.ast(), p2.ast(), s.ast());
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
  id: (l, r) => {
    const sourceString = r._baseInterval.sourceString;
    const startIndex = r._baseInterval.startIdx;
    const endIndex = r._baseInterval.endIdx;
    return `${sourceString.substring(startIndex, endIndex)}`;
  },
  // May be irrelevant due to Literal above.
  strlit: (q, s, _) => {
    const sourceString = s._baseInterval.sourceString;
    const startIndex = s._baseInterval.startIdx;
    const endIndex = s._baseInterval.endIdx;
    return new StringLiteral(sourceString.substring(startIndex, endIndex));
  },
  intlit: (i) => {
    const sourceString = i._baseInterval.sourceString;
    const startIndex = i._baseInterval.startIdx;
    const endIndex = i._baseInterval.endIdx;
    return new IntegerLiteral(sourceString.substring(startIndex, endIndex));
  },
  floatlit: (f1, p, f2) => {
    const sourceString = f1._baseInterval.sourceString;
    const startIndex = f1._baseInterval.startIdx;
    const endIndex = f1._baseInterval.endIdx;
    return new FloatLiteral(sourceString.substring(startIndex, endIndex));
  },
  boollit: (b) => {
    return new BooleanLiteral(b.sourceString);
  },
});
/* eslint-enable no-underscore-dangle */
/* eslint-enable arrow-body-style */
/* eslint-enable no-new */
/* eslint-enable no-unused-vars */

const parse = (text) => {
  const match = grammar.match(text);
  if (match.succeeded()) {
    return semantics(match).ast();
  }
  return error(match.message);
};

module.exports = parse;
