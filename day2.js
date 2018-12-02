const fs = require('fs');

const input = fs.readFileSync('./day2.txt', 'utf-8').split('\n').filter(inp => inp != '');

const candidates = {
  two: [],
  three: []
}

input.forEach(word => {
  const letterMap = word.split('').reduce((acc, letter) => {
    if (!acc[letter]) {
      acc[letter] = 0;
    }
    acc[letter] += 1;
    return acc
  }, {});

  let found2 = false;
  let found3 = false;
  Object.values(letterMap).forEach(letterCount => {
    if (letterCount == 2 && !found2) {
      candidates.two.push(word)
      found2 = true;
    }
    if (letterCount == 3 && !found3) {
      candidates.three.push(word)
      found3 = true;
    }
  });
})

const answerOne = candidates.two.length * candidates.three.length

let lowestDiff = Infinity;
let lowestDiffWord = '';
let fixedWords = [];
for (let i = 0; i < input.length; i++) {
  const word = input[i];
  for (let j = 0; j < input.length; j++) {
    if (i == j) continue;
    const other = input[j]

    let difference = 0;
    let wordCopy = word.split('');
    for (let k = 0; k < word.length; k++) {
      if (word[k] != other[k]) {
        delete wordCopy[k]
        difference += 1;
      }
    }

    if (difference < lowestDiff) {
      lowestDiff = difference;
      lowerstDiffWord = wordCopy.join('');
    }
  }
}

const answerTwo = lowestDiffWord
