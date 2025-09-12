import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

// 6551
const puzzle1 = (lines) => {
  return _.sumBy(lines, (group) => _.union(...group).length);
};

// 3358
const puzzle2 = (lines) => {
  return _.sumBy(lines, (group) => _.intersection(...group).length);
};

await fetchInput();

const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n\n')
  .map((group) => group.split('\n').map((person) => person.split('')));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
