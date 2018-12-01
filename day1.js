const fs = require('fs');

const input = fs.readFileSync('./day1.txt', 'utf-8').split('\n').filter(inp => inp != '');

// Puzzle 1
const answerOne = input.reduce((acc, value) => {
  acc += parseInt(value, 10);
  return acc;
}, 0);

console.log(answerOne);

// Puzzle 2
const answerTwo = (() => {
  const hits = {};
  let counter = 0;
  let i = 0;
  while (true) {
    const index = i++ % input.length;
    counter += parseInt(input[index], 10);
    if (hits.hasOwnProperty(counter)) {
      return counter;
    }
    hits[counter] = true;
  }
})();

console.log(answerTwo);
