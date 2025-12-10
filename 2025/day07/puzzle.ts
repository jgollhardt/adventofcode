import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 1518
const puzzle1 = (input: Input) => {
  let splits = 0;
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const char = input[i][j];
      const charBelow = input[i + 1][j];
      if (char === 'S') {
        input[i + 1][j] = '|';
      }

      if (char === '|') {
        if (charBelow === '^') {
          input[i + 1][j - 1] = '|';
          input[i + 1][j + 1] = '|';
          splits += 1;
        } else {
          input[i + 1][j] = '|';
        }
      }
    }
  }

  return splits;
};

// 25489586715621
const puzzle2 = (input: Input) => {
  let seen: number[][] = Array.from({ length: input.length }, () => []);
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const char = input[i][j];
      const charBelow = input[i + 1][j];
      if (char === 'S') {
        input[i + 1][j] = '|';
        seen[i + 1][j] = 1;
      }

      if (char === '|') {
        if (charBelow === '^') {
          input[i + 1][j - 1] = '|';
          input[i + 1][j + 1] = '|';
          seen[i + 1][j - 1] = (seen[i + 1][j - 1] ?? 0) + seen[i][j];
          seen[i + 1][j + 1] = (seen[i + 1][j + 1] ?? 0) + seen[i][j];
        } else {
          input[i + 1][j] = '|';
          seen[i + 1][j] = (seen[i + 1][j] ?? 0) + seen[i][j];
        }
      }
    }
  }

  return seen.pop()?.reduce((acc, cur) => acc + cur, 0);
};

await fetchInput();

// const data = fs.readFileSync('test_input.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const rawData = data.replace(/\n$/, '').split('\n');
const input = rawData.map((line) => line.split(''));
type Input = typeof input;

console.log(puzzle1(input));
console.log(puzzle2(input));
