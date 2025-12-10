import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 5060053676136
const puzzle1 = (input: Input) => {
  const ops = input.pop()!;
  const lines = input.map((line) => line.map((n) => +n));
  let results = lines.shift()!;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < ops.length; j++) {
      if (ops[j] === '*') {
        results[j] *= lines[i][j];
      } else {
        results[j] += lines[i][j];
      }
    }
  }

  return results?.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
};

// 9695042567249
const puzzle2 = (input: typeof rawData) => {
  // can use the space between the ops
  let rawOps = `${input.pop()} `.match(/(\*|\+)\s+/g);
  const ops = rawOps?.map((op) => {
    return [op.charAt(0), op.length - 1] as const;
  });

  let results: number[] = [];
  let opIdx = 0;
  ops?.map((op, idx) => {
    for (let i = 0; i < op[1]; i++) {
      let num = '';
      for (let j = 0; j < 4; j++) {
        const digit = input[j][opIdx + i];
        if (digit !== '') {
          num += digit;
        }
      }

      if (results[idx]) {
        if (op[0] === '*') {
          results[idx] *= +num;
        } else {
          results[idx] += +num;
        }
      } else {
        results[idx] = +num;
      }
    }

    opIdx += op[1] + 1;
  });

  return results?.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
};

await fetchInput();

// const data = fs.readFileSync('test_input.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const rawData = data.replace(/\n$/, '').split('\n');
const input = rawData.map((line) => line.trim().split(/\s+/));
type Input = typeof input;

console.log(puzzle1(input));
console.log(puzzle2(rawData));
