import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

// not 37
const puzzle1 = (lines) => {
  let acc = 0;
  const seen = new Set();
  let lineNumber = 0;
  let op;
  let num;
  while (!seen.has(lineNumber)) {
    ({ op, num, lineNumber } = lines[lineNumber]);
    seen.add(lineNumber);

    switch (op) {
      case 'acc':
        lineNumber += 1;
        acc += num;
        break;
      case 'jmp':
        lineNumber += num;
        break;
      case 'nop':
        lineNumber += 1;
        break;
    }
  }

  return acc;
};

const puzzle2 = (lines) => {
  let acc;
  lines.some((_, index) => {
    acc = 0;
    const seen = new Set();
    let lineNumber = 0;
    let op;
    let num;
    while (!seen.has(lineNumber)) {
      ({ op, num, lineNumber } = lines[lineNumber]);
      seen.add(lineNumber);

      if (lineNumber === index) {
        if (op === 'nop') op = 'jmp';
        else if (op === 'jmp') op = 'nop';
      }

      switch (op) {
        case 'acc':
          lineNumber += 1;
          acc += num;
          break;
        case 'jmp':
          lineNumber += num;
          break;
        case 'nop':
          lineNumber += 1;
          break;
      }

      if (lineNumber === lines.length) return true;
    }
  });

  return acc;
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')
  .map((line, index) => {
    const [op, num] = line.split(' ');
    return {
      op,
      num: parseInt(num),
      lineNumber: index,
    };
  });
console.log(puzzle1(lines));
console.log(puzzle2(lines));
