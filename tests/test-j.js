const parser = require('../parser');
const fs = require('fs');

fs.readFile(`./tests/testFiles/goodPrograms/if-alone.meme`, 'utf-8', (err, text) => {
  if (err) return;
  console.log(text);
  const parsedProgram = parser(text);
  // assert.doesNotThrow(() => parsedProgram.analyze(), Error);
});
