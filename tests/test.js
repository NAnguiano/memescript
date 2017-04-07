/* eslint-disable no-undef, no-unused-vars */

const parse = require('../parser.js');
const assert = require('chai').assert;
const fs = require('fs');

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
  ['i can haz aReturnStatement;',
    '(Program (Block (Return aReturnStatement)))'],
  ['this is bill (currentTime) { bill is smart { dicks.out("The sun is somewhere out there!"); be like bill; } }',
    '(Program (Block (Switch currentTime  SwitchDefaut (Block (Print "The sun is somewhere out there!")))))'],
  ['this is bill (currentTime) { bill has a "4:20" { console.error("You should be in class!"); be like bill; } bill is smart { dicks.out("Looks like you missed class!"); be like bill; } }',
    '(Program (Block (Switch currentTime (SwitchCase "4:20" (Block (Error "You should be in class!"))) SwitchDefaut (Block (Print "Looks like you missed class!")))))'],
  ['this is bill (currentTime) { bill is a "4:20" { console.error("You should be in class!"); be like bill; } bill is smart { dicks.out("Looks like you missed class!"); be like bill; } }',
    '(Program (Block (Switch currentTime (SwitchCase "4:20" (Block (Error "You should be in class!"))) SwitchDefaut (Block (Print "Looks like you missed class!")))))'],
  ['this is bill (currentTime) { bill is a "4:20" { console.error("You should DEFINITELY be in class!"); be like bill; } bill has a "11:20" { console.error("You should be in class!"); be like bill; } bill is smart { dicks.out("Looks like you missed to class!"); be like bill; } }',
    '(Program (Block (Switch currentTime (SwitchCase "4:20" (Block (Error "You should DEFINITELY be in class!"))) (SwitchCase "11:20" (Block (Error "You should be in class!"))) SwitchDefaut (Block (Print "Looks like you missed to class!")))))'],
  ['Chuck Norris doesn\'t { ermahgerd swimInWater; swimInWater = true; } or (err) { console.error(err); ermahgerd swimsOnLand; swimsOnLand = true; } he { ermahgerd person; person = "Chuck Norris"; swim(person); }',
    '(Program (Block (Try (Block (VarDec swimInWater) (Assignment swimInWater true)) Catch err (Block (Error err) (VarDec swimsOnLand) (Assignment swimsOnLand true)) Finally (Block (VarDec person) (Assignment person "Chuck Norris") (FunCall swim (FunctionArguments person ))))))'],
  ['Chuck Norris doesn\'t { overlyattachedgirlfriend.jpg cannotChange; cannotChange = true; cannotChange = false; } he (err) { console.error(err); dicks.out("You cannot change a constant!"); }',
    '(Program (Block (Try (Block (ConstDec cannotChange) (Assignment cannotChange true) (Assignment cannotChange false)) Catch err (Block (Error err) (Print "You cannot change a constant!")))))'],
  ['yo, I\'mma let you finish (talking) but { here comes dat boi("INFINITE LOOP, BABY"); }',
    '(Program (Block (While talking (Block (Alert "INFINITE LOOP, BABY")))))'],
];

const GOOD_SEMANTIC_TESTS = [
  'assignmentandinitialization.meme',
  'everything.meme',
  'expressions.meme',
  'function.meme',
  'if.meme',
  'loops.meme',
  'object.meme',
  'random.meme',
  'switch.meme',
  'try.meme',
  'alert.meme',
  'expressions.meme',
];

const SEMANTIC_ERROR_TESTS = [
  'useundefinedvariable.meme',
  'reassignconstant.meme',
  'reinitializevariable.meme',
  'returnoutsidefunction.meme',
  'callfunctionwithtoofewargs.meme',
  'callfunctionwithtoomanyargs.meme',
  'addboolandnum.meme',
  'declareconstantwithoutinit.meme',
  'assigntoundeclaredvariable.meme',
  'addnullandstring.meme',
  'multiplystrings.meme',
  'stringlessthanbool.meme',
  'addnumandstring.meme',
  'logicalandnumbers.meme',
  'reinitializeconstant.meme',
  'ifwithnonbooleanconditional.meme',
  'elseifwithnonbooleanconditional.meme',
  'forloopwithnonbooleanconditional.meme',
  'whileloopwithnonbooleanconditional.meme',
  'callfunctionbeforedeclaration.meme',
  'callvarasfunction.meme',
  'giveoptionalparamwrongtype.meme',
  'assignfunctiontoexistingvar.meme',
  'usevarbeforedecl.meme',
  'giveobjmethodsofsamename.meme',
  'optionalparambeforerequiredparam.meme',
  'splatparaminmiddle.meme',
  'returnnotinfunction.meme',
  'functionreturntwodifftypes.meme',
  'usebangonstring.meme',
  'usenegateonbool.meme',
  'redeclarevar.meme',
];

describe('AST Tests', () => {
  console.log('AST tests replaced with node util statement.');
  // AST_TESTS.forEach(([program, ast]) => {
  //   it(`should compile ${program} to ${ast}`, () => {
  //     assert.equal(parse(program), ast);
  //   });
  // });
});

describe('Semantic Analyzer Tests', () => {
  GOOD_SEMANTIC_TESTS.forEach((program) => {
    it(`${program} should compile without errors`, () => {
      fs.readFileSync(`./tests/testFiles/goodPrograms/${program}`, 'utf-8', (err, text) => {
        if (err) return;
        const parsedProgram = parse(text);
        assert.isUndefined(parsedProgram.analyze());
      });
    });
  });
  SEMANTIC_ERROR_TESTS.forEach((program) => {
    it(`${program} should throw an Error`, () => {
      fs.readFileSync(`./tests/testFiles/semanticErrors/${program}`, 'utf-8', (err, text) => {
        if (err) return;
        const parsedProgram = parse(text);
        assert.throws(parsedProgram.analyze(), Error);
      });
    });
  });
});
