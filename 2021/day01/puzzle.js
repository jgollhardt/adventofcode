import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 1557
const puzzle1 = (lines) => {
  let result = 0;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] > lines[i - 1]) {
      result += 1;
    }
  }
  return result;
};

// 1608
const puzzle2 = (lines) => {
  let result = 0;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] > lines[i - 3]) {
      result += 1;
    }
  }
  return result;
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')
  .map((line) => parseInt(line));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
