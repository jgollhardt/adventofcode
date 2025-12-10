import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 1320
const puzzle1 = (lines: typeof dataLines) => {
  let result = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] === '@') {
        let count = 0;
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (x === 0 && y === 0) continue;

            if (lines[i + x] && lines[i + x][j + y] === '@') {
              count++;
            }
          }
        }
        if (count < 4) {
          result += 1;
        }
      }
    }
  }
  return result;
};

// 8354
const puzzle2 = (lines: typeof dataLines) => {
  let totalResult = 0;

  while (true) {
    let result = 0;
    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[0].length; j++) {
        if (lines[i][j] === '@') {
          let count = 0;
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              if (x === 0 && y === 0) continue;

              if (lines[i + x] && lines[i + x][j + y] === '@') {
                count++;
              }
            }
          }
          if (count < 4) {
            result += 1;
            lines[i][j] = 'x';
          }
        }
      }
    }

    if (result === 0) break;

    totalResult += result;
  }

  return totalResult;
};

await fetchInput();

// const data = fs.readFileSync('test_input.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const dataLines = data
  .trim()
  .split('\n')
  .map((line) => {
    return line.split('');
  });

console.log(puzzle1(dataLines));
console.log(puzzle2(dataLines));
