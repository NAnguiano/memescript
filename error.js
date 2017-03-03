/*
  Modified from https://github.com/rtoal/iki-compiler/blob/master/error.coffee
  Thanks Dr. Toal!
*/

const error = (message, location) => {
  let completeMessage = message;
  if (location && location.line) {
    completeMessage += `at line ${location.line}`;
    if (location.col) {
      completeMessage += `, column ${location.col}`;
    }
  }
  if (!error.quiet) {
    console.log(`Error: ${completeMessage}`);
  }
  error.count += 1;
  return error.count;
};

error.quiet = false;
error.count = 0;

module.exports = error;
