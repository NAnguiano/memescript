const parse = require('../parser');
const assert = require('chai').assert;
const fs = require('fs');
require('../generator');

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

const MORE_GOOD_SEMANTIC_TESTS = [
  'assignment.meme',
  'declaration.meme',
  'errorandalert.meme',
  'forloop.meme',
  'functioncall.meme',
  'functiondeclaration.meme',
  'ifstatement.meme',
  'objectDeclaration.meme',
  'print.meme',
  'switchstatement.meme',
  'trycatch.meme',
  'trycatchfinally.meme',
  'whilestatement.meme',
];

const SEMANTIC_ERROR_TESTS = [
  'useundefinedvariable.meme',
  'reassignconstant.meme',
  'reinitializevariable.meme',
  'returnoutsidefunction.meme',
  'callfunctionwithtoofewargs.meme',
  'callfunctionwithtoomanyargs.meme',
  'addboolandnum.meme',
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
  'declareobjbeforeuse.meme',
  'initializevarasobject.meme',
  'initobjwithtoofewargs.meme',
  'initobjwithtoomanyargs.meme',
  'usedotnontationonstring.meme',
  'usedotnontationonnumber.meme',
];

// const CODE_GENERATOR_TESTS = [
//   ['constinit.meme', 'const a_ = 10;'],
// ];

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
    it(`${program} should compile without errors`, (done) => {
      fs.readFile(`./tests/testFiles/goodPrograms/${program}`, 'utf-8', (err, text) => {
        if (err) return;
        const parsedProgram = parse(text);
        assert.doesNotThrow(() => parsedProgram.analyze(), Error);
        done();
      });
    });
  });
  MORE_GOOD_SEMANTIC_TESTS.forEach((program) => {
    it(`${program} should compile without errors`, (done) => {
      fs.readFile(`./tests/testFiles/entities/${program}`, 'utf-8', (err, text) => {
        if (err) return;
        const parsedProgram = parse(text);
        assert.doesNotThrow(() => parsedProgram.analyze(), Error);
        done();
      });
    });
  });
  SEMANTIC_ERROR_TESTS.forEach((program) => {
    it(`${program} should throw an Error`, (done) => {
      fs.readFile(`./tests/testFiles/semanticErrors/${program}`, 'utf-8', (err, text) => {
        if (err) return;
        const parsedProgram = parse(text);
        assert.throws(() => parsedProgram.analyze(), Error);
        done();
      });
    });
  });
});

// describe('Code Generation Tests', () => {
//   CODE_GENERATOR_TESTS.forEach(([program, js]) => {
//     it(`${program} should generate ${js}`, (done) => {
//       fs.readFile(`./tests/testFiles/generatorTests/${program}`, 'utf-8', (err, text) => {
//         if (err) return;
//         const parsedProgram = parse(text);
//         assert.doesNotThrow(() => parsedProgram.analyze(), Error);
//         const generatedProgram = parsedProgram.gen();
//         assert.equal(generatedProgram, js);
//         done();
//       });
//     });
//   });
// });
