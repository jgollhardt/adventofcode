import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

// 1005459
const puzzle1 = (lines) => {
  const linesSet = new Set(lines);
  for (const line of lines) {
    const diff = 2020 - line;
    if (linesSet.has(diff)) {
      return line * diff;
    }
  }
};

// 92643264
const puzzle2 = (lines) => {
  for (let i = 0; i < lines.length - 2; i++) {
    for (let j = i + 1; j < lines.length - 1; j++) {
      for (let k = j + 1; k < lines.length; k++) {
        if (lines[i] + lines[j] + lines[k] === 2020)
          return lines[i] * lines[j] * lines[k];
      }
    }
  }
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8')
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')
  .map((line) => parseInt(line));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
