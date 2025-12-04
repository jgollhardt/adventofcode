import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 29940924880
const puzzle1 = (lines: typeof dataLines) => {
  let result = 0;
  lines.map(([begin, end]) => {
    for (let i = begin; i <= end; i++) {
      const id = i.toString();
      if (id.slice(0, id.length / 2) === id.slice(id.length / 2)) {
        result += i;
      }
    }
  });

  return result;
};

// 48631958998
const puzzle2 = (lines: typeof dataLines) => {
  let result = 0;
  lines.map(([begin, end]) => {
    for (let i = begin; i <= end; i++) {
      const id = i.toString();
      for (let j = 1; j < id.length; j++) {
        const parts = id.match(new RegExp(`.{1,${j}}`, 'g'));
        if (parts && parts.every((part) => part === parts[0])) {
          result += i;
          break;
        }
      }
    }
  });

  return result;
};

await fetchInput();

// const data = fs.readFileSync('test_input.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const dataLines = data
  .trim()
  .split(',')
  .map((line) => {
    return line.split('-').map((id) => parseInt(id)) as [number, number];
  });
console.log(puzzle1(dataLines));
console.log(puzzle2(dataLines));
