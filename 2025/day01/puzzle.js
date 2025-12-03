import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 56
const puzzle1 = (lines) => {
  let dial = 50;
  let result = 0;
  lines.map(([dir, n]) => {
    if (dir === 'R') {
      dial = (dial + n) % 100;
    } else {
      dial = (((dial - n) % 100) + n) % 100;
    }

    if (dial === 0) result += 1;
  });

  return result;
};

// 5887
const puzzle2 = (lines) => {
  let dial = 50;
  let result = 0;
  lines.map(([dir, n]) => {
    let numZeroes = 0;
    let newDial;

    if (dir === 'R') {
      numZeroes = Math.floor((dial + n) / 100);
      newDial = (dial + n) % 100;
    } else {
      numZeroes = Math.floor(Math.abs((100 - (dial - n)) / 100));
      // If dial starts on 0, don't double count it
      if (dial === 0) {
        numZeroes -= 1;
      }
      newDial = (((dial - n) % 100) + 100) % 100;
    }

    dial = newDial;
    result += numZeroes;
  });

  return result;
};

await fetchInput();

// const data = fs.readFileSync('test_input.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')
  .map((line) => {
    return [line.slice(0, 1), parseInt(line.slice(1))];
  });
console.log(puzzle1(lines));
console.log(puzzle2(lines));
