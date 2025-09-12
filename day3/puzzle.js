import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

// 203
const puzzle1 = (lines) => {
  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i][(3 * i) % lines[i].length] === '#') {
      count++;
    }
  }

  return count;
};

// 3316272960
const puzzle2 = (lines) => {
  let result = 1;
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  slopes.forEach(([dx, dy]) => {
    let count = 0;
    for (let i = 0; dy * i < lines.length; i++) {
      if (lines[dy * i][(dx * i) % lines[i].length] === '#') {
        count++;
      }
    }
    result *= count;
  });

  return result;
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8')
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
