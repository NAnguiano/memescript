/*
  Modified from https://github.com/rtoal/iki-compiler/blob/master/iki.coffee
  Thanks Dr. Toal!
*/

const argv = require('yargs')
             .usage('$0 [-a] [-o] [-i] [--target [x86|c|js]]')
             .boolean(['a', 's', 'o', 'i'])
             .describe('a', 'Show abstract syntax tree after parsing using node inspector, then stop.')
             .describe('s', 'Show abstract syntax tree after parsing using toString, then stop.')
             .describe('o', 'Do optimizations')
             .describe('i', 'generate and show the intermediate code, then stop.')
             .describe('target', 'generate code for x86, C, or JavaScript')
             .default({ target: 'js' })
             .demand(1)
             .argv;

const fs = require('fs');
const parse = require('./parser');
const util = require('util');
// const generate = (require('./generator'))(argv.target);
const error = require('./error');

fs.readFile(argv._[0], 'utf-8', (err, text) => {
  const program = parse(text); // change to let once we do optimization
  if (error.count > 0) return;
  if (argv.a) {
    console.log(util.inspect(program, { depth: null }));
    return;
  }
  if (argv.s) {
    console.log(program.toString());
    return;
  }
  program.analyze();
  /* if (error.count > 0) return;
  if (argv.o) {
    program = program.optimize;
  }
  if (argv.i) {
    program.showSemanticGraph();
    return;
  }
  return generate(program); */
});
