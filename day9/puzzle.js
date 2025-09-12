import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';
import { sign } from 'crypto';

// 1038347917
const puzzle1 = (lines) => {
  for (let i = 0; i < lines.length - 26; i++) {
    const last25 = lines.slice(i, i + 25);
    const num = lines[i + 25];

    const diffs = new Set(last25.map((last25Num) => num - last25Num));
    if (!last25.some((last25Num) => diffs.has(last25Num))) return num;
  }
};

// 137394018
const puzzle2 = (lines, target) => {
  for (let i = 0; i < lines.length; i++) {
    let sum = lines[i] + lines[i + 1];
    let j = i + 2;
    while (sum < target) {
      sum += lines[j];
      j++;
    }

    if (sum === target) {
      const range = lines.slice(i, j + 1);
      return Math.min(...range) + Math.max(...range);
    }
  }
};

await fetchInput();

const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')
  .map((line) => parseInt(line));
const target = puzzle1(lines);
console.log(target);
console.log(puzzle2(lines, target));
