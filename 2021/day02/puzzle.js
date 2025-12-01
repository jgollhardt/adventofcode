import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 1670340
const puzzle1 = (lines) => {
  let x = 0;
  let y = 0;
  lines.forEach((line) => {
    let [dir, amount] = line;
    amount = parseInt(amount);
    switch (dir) {
      case 'forward':
        x += amount;
        break;
      case 'up':
        y -= amount;
        break;
      case 'down':
        y += amount;
        break;
    }
  });
  return x * y;
};

// 1954293920
const puzzle2 = (lines) => {
  let aim = 0;
  let x = 0;
  let y = 0;
  lines.forEach((line) => {
    let [dir, amount] = line;
    amount = parseInt(amount);
    switch (dir) {
      case 'forward':
        x += amount;
        y += amount * aim;
        break;
      case 'up':
        aim -= amount;
        break;
      case 'down':
        aim += amount;
        break;
    }
  });
  return x * y;
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')
  .map((line) => line.split(' '));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
