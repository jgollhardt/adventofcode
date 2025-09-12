import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 352254
const puzzle1 = (lines) => {
  let minCost = Number.MAX_SAFE_INTEGER;
  for (let x = Math.min(...lines); x <= Math.max(...lines); x++) {
    // calc total cost
    let cost = 0;
    for (const pos of lines) {
      cost += Math.abs(pos - x);
    }
    if (cost < minCost) {
      minCost = cost;
    }
  }

  return minCost;
};

// 99053143
const puzzle2 = (lines) => {
  let minCost = Number.MAX_SAFE_INTEGER;
  for (let x = Math.min(...lines); x <= Math.max(...lines); x++) {
    // calc total cost
    let cost = 0;
    for (const pos of lines) {
      const n = Math.abs(pos - x);
      cost += ((n + 1) * n) / 2;
    }
    if (cost < minCost) {
      minCost = cost;
    }
  }

  return minCost;
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split(',')
  .map((line) => parseInt(line));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
