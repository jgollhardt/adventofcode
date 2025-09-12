import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

// 2470
const puzzle1 = (lines) => {
  lines = _.sortBy(lines);
  let num = 0;
  let result_1 = 0;
  let result_3 = 1;
  for (const line of lines) {
    const diff = line - num;
    if (diff === 1) result_1 += 1;
    if (diff === 3) result_3 += 1;
    num = line;
  }
  return result_1 * result_3;
};

// 1973822685184
const puzzle2 = (lines) => {
  lines = _.sortBy(lines);

  let chainLengths = [];
  let length = 1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] - (lines[i - 1] ?? 0) !== 1) {
      chainLengths.push(length);
      length = 1;
    } else {
      length++;
    }
  }
  chainLengths.push(length);

  // chain of 3 => 2 branches
  // chain of 4 => 4 branches
  // chain of 5 => 7 branches
  return chainLengths.reduce((acc, chainLength) => {
    if (chainLength === 3) acc *= 2;
    if (chainLength === 4) acc *= 4;
    if (chainLength === 5) acc *= 7;
    return acc;
  }, 1);
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')
  .map((num) => parseInt(num));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
