/* eslint-disable no-undef */

const parse = require('../parser.js');
const assert = require('chai').assert;

const AST_TESTS = [
  ['overlyattachedgirlfriend.jpg dragon; ermahgerd items;',
    '(Program (Block (ConstDec dragon) (VarDec items)))'],
  ['test = 2; test = 2222222; test2 = "this is a string"; test3 = 2.2; test4 = -2; test5 = !false;',
    '(Program (Block (Assignment test 2) (Assignment test 2222222) (Assignment test2 "this is a string") (Assignment test3 2.2) (Assignment test4 (UnaryExpression - 2)) (Assignment test5 (UnaryExpression ! false))))'],
];

describe('Entity Tests', () => {
  AST_TESTS.forEach(([program, ast]) => {
    it(`should compile ${program} to ${ast}`, () => {
      assert.equal(parse(program), ast);
    });
  });
});
