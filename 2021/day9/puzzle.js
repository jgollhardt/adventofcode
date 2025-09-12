import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

//
const puzzle1 = (lines) => {
  return lines;
};

//
const puzzle2 = (lines) => {};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
