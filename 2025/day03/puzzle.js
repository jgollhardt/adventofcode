import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 17359
const puzzle1 = (lines) => {
  let result = 0;
  lines.map((line) => {
    for (let num = 9; num > 0; num--) {
      const numStr = num.toString();
      if (line.includes(numStr)) {
        const remaining = line.substring(line.indexOf(numStr) + 1);
        if (remaining.length === 0) continue;

        let joltage = 0;
        for (let j = 9; j > 0; j--) {
          const jStr = j.toString();
          if (remaining.includes(jStr)) {
            joltage = parseInt(`${numStr}${jStr}`);
            result += joltage;
            break;
          }
        }

        if (joltage != 0) break;
      }
    }
  });

  return result;
};

// 172787336861064
const puzzle2 = (lines) => {
  let result = 0;
  lines.map((line) => {
    let remaining = line;
    let joltageStr = '';
    for (let i = 0; i < 12; i++) {
      for (let num = 9; num > 0; num--) {
        const numStr = num.toString();
        const numIndex = remaining.indexOf(numStr);
        if (numIndex !== -1 && numIndex <= remaining.length - (12 - i)) {
          remaining = remaining.substring(remaining.indexOf(numStr) + 1);
          joltageStr += numStr;
          break;
        }
      }
    }

    result += parseInt(joltageStr);
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
    return line;
  });
console.log(puzzle1(lines));
console.log(puzzle2(lines));
