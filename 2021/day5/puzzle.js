import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 5585
const puzzle1 = (lines) => {
  const map = {};
  for (const [[x1, y1], [x2, y2]] of lines) {
    if (x1 === x2) {
      for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
        map[[x1, i]] = (map[[x1, i]] ?? 0) + 1;
      }
    }

    if (y1 === y2) {
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        map[[i, y1]] = (map[[i, y1]] ?? 0) + 1;
      }
    }
  }

  return _.sumBy(Object.values(map), (count) => count >= 2);
};

// 17193
const puzzle2 = (lines) => {
  const map = {};
  for (const [[x1, y1], [x2, y2]] of lines) {
    if (x1 === x2) {
      for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
        map[[x1, i]] = (map[[x1, i]] ?? 0) + 1;
      }
    } else if (y1 === y2) {
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        map[[i, y1]] = (map[[i, y1]] ?? 0) + 1;
      }
    } else {
      const dx = x1 < x2 ? 1 : -1;
      const dy = y1 < y2 ? 1 : -1;
      for (let x = x1, y = y1; x1 < x2 ? x <= x2 : x >= x2; x += dx, y += dy) {
        map[[x, y]] = (map[[x, y]] ?? 0) + 1;
      }
    }
  }

  return _.sumBy(Object.values(map), (count) => count >= 2);
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')
  .map((line) =>
    line.split(' -> ').map((pos) => pos.split(',').map((num) => parseInt(num)))
  );
console.log(puzzle1(lines));
console.log(puzzle2(lines));
