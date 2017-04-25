/*
  Modified from https://github.com/rtoal/iki-compiler/blob/master/iki.coffee
  Thanks Dr. Toal!
*/

const argv = require('yargs')
             .usage('$0 [-a] [-s] [-a] [-g]')
             .boolean(['n', 's', 'a', 'g'])
             .describe('n', 'Show abstract syntax tree after parsing using node inspector, then stop.')
             .describe('s', 'Show abstract syntax tree after parsing using toString, then stop.')
             .describe('a', 'Analyze the program after parsing, then stop.')
             .describe('g', 'Generate the equivalent javascript after parsing, then stop. Note: Does not perform semantic analysis.')
            //  .describe('o', 'Do optimizations')
            //  .describe('i', 'generate and show the intermediate code, then stop.')
             .demand(1)
             .argv;

const fs = require('fs');
const parse = require('./parser');
const util = require('util');
const error = require('./error');
require('./generator');

fs.readFile(argv._[0], 'utf-8', (err, text) => {
  const program = parse(text);
  if (error.count > 0) return;
  if (argv.n) {
    console.log(util.inspect(program, { depth: null }));
    return;
  }
  if (argv.s) {
    console.log(program.toString());
    return;
  }
  if (argv.a) {
    program.analyze();
    return;
  }
  if (argv.g) {
    program.gen();
    return;
  }
  program.analyze();
  if (error.count > 0) return;
  /* if (argv.o) {
    program = program.optimize;
  }
  if (argv.i) {
    program.showSemanticGraph();
    return;
  } */
  program.gen();
});
