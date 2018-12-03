const fs = require('fs');

const input = fs.readFileSync('./day3.txt', 'utf-8').split('\n').filter(inp => inp != '');

const parsed = input.map(line => {
  const re = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/g;
  const match = re.exec(line);
  return { 
    id: match[1],
    left: +match[2],
    top: +match[3],
    width: +match[4],
    height: +match[5],
  };
});

let grid = {};

for (const row of parsed) {
  for (let x = row.left; x < row.left + row.width; x++) {
  for (let y = row.top; y < row.top + row.height; y++) {
    const coords = `${x},${y}`;
    grid[coords] = (grid[coords] || 0) + 1;
  }
  }
}

console.log(Object.values(grid).filter(v => v > 1).length);

grid = {};
const claims = {};

for (const row of parsed) {
  claims[row.id] = true;
  for (let x = row.left; x < row.left + row.width; x++) {
  for (let y = row.top; y < row.top + row.height; y++) {
    const coords = `${x},${y}`;
    if (grid[coords]) {
      claims[grid[coords]] = false;
      claims[row.id] = false;
    }
    grid[coords] = row.id
  }
  }
}

console.log(Object.entries(claims).filter(v => v[1])[0][0]);
