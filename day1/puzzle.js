import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

const puzzle1 = (lines) => {
  for (let i = 0; i < lines.length - 2; i++) {
    for (let j = i + 1; j < lines.length - 1; j++) {
      if (lines[i] + lines[j] === 2020) return lines[i] * lines[j];
    }
  }
}

const puzzle2 = (lines) => {
  for (let i = 0; i < lines.length - 2; i++) {
    for (let j = i + 1; j < lines.length - 1; j++) {
      for (let k = j + 1; k < lines.length; k++) {
        if (lines[i] + lines[j] + lines[k] === 2020) return lines[i] * lines[j] * lines[k];
      }
    }
  }
}

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8')
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n').map(line => parseInt(line));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
