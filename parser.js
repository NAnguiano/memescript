/*
  Modified from https://github.com/rtoal/iki-compiler/blob/master/parser.coffee
  Thanks Dr. Toal!
*/

const Program = require('./entities/program.js');
const Block = require('./entities/block.js');
const ConstantDeclaration = require('./entities/constantdeclaration.js');
const VariableDeclaration = require('./entities/variabledeclaration.js');
const FunctionDeclaration = require('./entities/functiondeclaration.js');
// const IfStatement = require('./entities/ifstatement.js');
// const WhileStatement = require('./entities/whilestatement.js');
// const ForLoop = require('./entities/forloop.js')
// const TryCatch = require('./entities/trycatch.js')
// const TryCatchFinally = require(.'entities/trycatchfinally.js');
const SwitchStatement = require('./entities/switchstatement.js');
const SwitchCase = require('./entities/switchcase.js');
const SwitchDefault = require('./entities/switchdefault.js');
// const FunctionCall = require('./entities/functioncall.js');
const Assignment = require('./entities/assignment.js');
const ReturnStatement = require('./entities/returnstatement.js');
// const PrintStatement = require('./entities/printstatement.js');
const BinaryExpression = require('./entities/binaryexpression.js');
const UnaryExpression = require('./entities/unaryexpression.js');
// const VariableSubscript = require('./entities/variablesubscript.js');
const Parameters = require('./entities/parameters.js');
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
  ConstDec: (o, i, _) => {
    return new ConstantDeclaration(i.sourceString);
  },
  VarDec: (e, i, _) => {
    return new VariableDeclaration(i.sourceString);
  },
  FunDec: (y, i, rp, p, lp, _, b) => {
    return new FunctionDeclaration(i.sourceString, p.ast(), b.ast());
  },
  Assignment: (i, q, e, _) => {
    return new Assignment(i.sourceString, e.ast());
  },
  Switch: (s, p1, e, p2, b1, c, d, b2) => {
    console.log(e);
    return new SwitchStatement(e.ast(), c.ast(), d.ast());
  },
  SwitchCase: (intro, l, b1, b, end, b2) => {
    return new SwitchCase(l.ast(), b.ast());
  },
  SwitchDefault: (intro, b1, b, end, b2) => {
    return new SwitchDefault(b.ast());
  },
  Return: (i, e, _) => {
    return new ReturnStatement(e.ast());
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
  id: (l, r) => {
    return `${l}${r}`;
  },
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
