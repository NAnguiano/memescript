/* eslint-disable no-undef */

const parse = require('../parser.js');
const assert = require('chai').assert;

const AST_TESTS = [
  ['overlyattachedgirlfriend.jpg b; b = 20;',
    '(Program (Block (ConstDec b) (Assignment b 20)))'],
  ['ermahgerd helloIAmAVariable; helloIAmAVariable = 20.3;',
    '(Program (Block (VarDec helloIAmAVariable) (Assignment helloIAmAVariable 20.3)))'],
  ['overlyattachedgirlfriend.jpg iAmConst; ermahgerd iAmNotConst; iAmConst = "hello!"; iAmNotConst = \'Goodbye.\';',
    '(Program (Block (ConstDec iAmConst) (VarDec iAmNotConst) (Assignment iAmConst "hello!") (Assignment iAmNotConst \'Goodbye.\')))'],
  ['ermahgerd multiply; multiply = 5 * 4; ermahgerd divide; divide = 24.4 / 232.2; ermahgerd mod; mod = 10 % 2.2;',
    '(Program (Block (VarDec multiply) (Assignment multiply (BinaryExpression 5 * 4)) (VarDec divide) (Assignment divide (BinaryExpression 24.4 / 232.2)) (VarDec mod) (Assignment mod (BinaryExpression 10 % 2.2))))'],
  ['ermahgerd nest; nest = 5 * 7 + 3 * 23 / 2 % 6 - 11 + -2;',
    '(Program (Block (VarDec nest) (Assignment nest (BinaryExpression (BinaryExpression (BinaryExpression (BinaryExpression 5 * 7) + (BinaryExpression (BinaryExpression (BinaryExpression 3 * 23) / 2) % 6)) - 11) + (UnaryExpression - 2)))))'],
  ['gte = 5 >= 4; lte = 4 <= 5.4; lt = 7 < 10; gt = 10 > 7.3; ne = 5 != 6; eq1 = 2 == 4; eq2 = 4 === 4;',
    '(Program (Block (Assignment gte (BinaryExpression 5 >= 4)) (Assignment lte (BinaryExpression 4 <= 5.4)) (Assignment lt (BinaryExpression 7 < 10)) (Assignment gt (BinaryExpression 10 > 7.3)) (Assignment ne (BinaryExpression 5 != 6)) (Assignment eq1 (BinaryExpression 2 == 4)) (Assignment eq2 (BinaryExpression 4 === 4))))'],
  ['add = 5 + 5; sub = 5 - 5;',
    '(Program (Block (Assignment add (BinaryExpression 5 + 5)) (Assignment sub (BinaryExpression 5 - 5))))'],
  ['un = -4 + (-4); notFive = !5;',
    '(Program (Block (Assignment un (BinaryExpression (UnaryExpression - 4) + (UnaryExpression - 4))) (Assignment notFive (UnaryExpression ! 5))))'],
  ['ermahgerd isBool; isBool = true; ermahgerd isNum; isNum = false;',
    '(Program (Block (VarDec isBool) (Assignment isBool true) (VarDec isNum) (Assignment isNum false)))'],
  ['dicks.out("I am print.");',
    '(Program (Block (Print "I am print.")))'],
  ['here comes dat boi("AN ALERT!");',
    '(Program (Block (Alert "AN ALERT!")))'],
  ['console.error("this is a boring error message syntax.");',
    '(Program (Block (Error "this is a boring error message syntax.")))'],
  ['I don\'t always (!notFalse) but when I do { }',
    '(Program (Block (IfStatement (UnaryExpression ! notFalse)   )))'],
  ['I don\'t always (!notFalse) but when I do { dicks.out("Hi"); } but sometimes I (notFalse) {}',
    '(Program (Block (IfStatement (UnaryExpression ! notFalse) (Block (Print "Hi")) (ElseIfStatement notFalse ) )))'],
  ['I don\'t always (!notFalse) but when I do { dicks.out("Hi"); } otherwise I do { dicks.out("Bye"); }',
    '(Program (Block (IfStatement (UnaryExpression ! notFalse) (Block (Print "Hi"))  (ElseStatement (Block (Print "Bye"))))))'],
  ['I don\'t always (!notFalse) but when I do { dicks.out("Hi"); } but sometimes I (notFalse === maybeTrue) { here comes dat boi("heeeyyyyy"); } otherwise I do { dicks.out("Bye"); }',
    '(Program (Block (IfStatement (UnaryExpression ! notFalse) (Block (Print "Hi")) (ElseIfStatement (BinaryExpression notFalse === maybeTrue) (Block (Alert "heeeyyyyy"))) (ElseStatement (Block (Print "Bye"))))))'],
  ['one does not simply { ermahgerd woah; woah = 12; ermahgerd doubleWoah; doubleWoah = woah * 2; } without (ermahgerd tripleWoah; c > woah * 3; c = c + 1;)',
    '(Program (Block (For (Block (VarDec woah) (Assignment woah 12) (VarDec doubleWoah) (Assignment doubleWoah (BinaryExpression woah * 2))) (VarDec tripleWoah) (BinaryExpression c > (BinaryExpression woah * 3)) (Assignment c (BinaryExpression c + 1)))))'],
  ['you: shady (af) me, an intellectual: { dicks.out("I am shady as heck"); i can haz !af; } shady(true);',
    '(Program (Block FunDec shady (Parameters (Param af)  ) (Block (Print "I am shady as heck") (Return (UnaryExpression ! af))) (FunCall shady (FunctionArguments true ))))'],
  ['you: getMe() me, an intellectual: { here comes dat boi("I understand you."); } getMe();',
    '(Program (Block FunDec getMe (Parameters   ) (Block (Alert "I understand you.")) (FunCall getMe (FunctionArguments  ))))'],
  ['you: sayHelloTo(a, b, c, d, e) me, an intellectual: { dicks.out("hello" + a + "!"); dicks.out("hello" + b + "!"); dicks.out("hello" + c + "!"); dicks.out("hello" + d + "!"); dicks.out("hello" + e + "!"); } sayHelloTo("You", "Me", "Toal", "Dondi", "Dorin");',
    '(Program (Block FunDec sayHelloTo (Parameters (Param a) (Param b) (Param c) (Param d) (Param e) ) (Block (Print (BinaryExpression (BinaryExpression "hello" + a) + "!")) (Print (BinaryExpression (BinaryExpression "hello" + b) + "!")) (Print (BinaryExpression (BinaryExpression "hello" + c) + "!")) (Print (BinaryExpression (BinaryExpression "hello" + d) + "!")) (Print (BinaryExpression (BinaryExpression "hello" + e) + "!"))) (FunCall sayHelloTo (FunctionArguments "You" "Me" "Toal" "Dondi" "Dorin"))))'],
  ['you: beep(horn, stop = false) me, an intellectual: { I don\'t always (horn) but when I do { stop = !stop; } } beep(true); beep(true, true);',
    '(Program (Block FunDec beep (Parameters (Param horn) (OptionalParam stop false) ) (Block (IfStatement horn (Block (Assignment stop (UnaryExpression ! stop)))  )) (FunCall beep (FunctionArguments true )) (FunCall beep (FunctionArguments true true))))'],
  ['wow stairs { such (height, width, numSteps) { dicks.out(height); dicks.out(width); dicks.out(numSteps); } so walkUp () { here comes dat boi("You walked up" + numSteps + "steps."); } }',
    '(Program (Block ObjDec stairs ObjConstructor (Parameters (Param height) (Param width) (Param numSteps) ) (Block (Print height) (Print width) (Print numSteps)) ObjMethods walkUp (Parameters   ) (Block (Alert (BinaryExpression (BinaryExpression "You walked up" + numSteps) + "steps.")))))'],
  /*
    return
    switch with only defualt
    switch with both kinds of cases
    switch with one kind of case
    switch with other kind of case
    try catch
    try catch finally
    while
  */
];

describe('Entity Tests', () => {
  AST_TESTS.forEach(([program, ast]) => {
    it(`should compile ${program} to ${ast}`, () => {
      assert.equal(parse(program), ast);
    });
  });
});
