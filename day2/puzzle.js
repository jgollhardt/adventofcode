import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

// 434
const puzzle1 = (lines) => {
  const valids = lines.filter(line => {
    const [min, max, letter, password] = line;
    let count = 0;
    for (const char of password) {
      if (char === letter) count += 1;
    }

    return min <= count && count <= max;
  });

  return valids.length;
}

// 509
const puzzle2 = (lines) => {
  const valids = lines.filter(line => {
    const [min, max, letter, password] = line;
    return password[min - 1] === letter ^ password[max - 1] === letter;
  });

  return valids.length;
}

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8')
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n')
  .map(line => {
    const parts = line.split(" ");
    return [...parts[0].split('-').map(part => parseInt(part)), parts[1][0], parts[2]];
  });
// .map(line => parseInt(line));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
