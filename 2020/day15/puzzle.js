import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 700
const puzzle1 = (lines, target = 2020) => {
  let nums = [...lines[0].split(',').map((x) => parseInt(x))];
  const seen = new Map();
  nums.forEach((num, i) => {
    seen.set(num, i);
  });

  let nextNum = 0;
  for (let i = nums.length; i < target - 1; i++) {
    const lastSeen = seen.get(nextNum);
    seen.set(nextNum, i);

    if (nextNum >= 0 && lastSeen >= 0) {
      nextNum = i - lastSeen;
    } else {
      nextNum = 0;
    }
  }

  return nextNum;
};

// 51358
const puzzle2 = (lines) => {
  return puzzle1(lines, 30000000);
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
