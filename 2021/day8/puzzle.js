import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 493
const puzzle1 = (lines) => {
  let result = 0;
  for (const [left, output] of lines) {
    for (const o of output) {
      if ([2, 3, 4, 7].includes(o.length)) result += 1;
    }
  }
  return result;
};

// 1010460
const puzzle2 = (lines) => {
  let result = 0;
  for (const [lhs, output] of lines) {
    let digits = lhs.map((digit) => digit.split('').sort().join(''));

    // Figure out each unique digit
    const conversion = {};
    for (const digit of digits) {
      if (digit.length === 2) {
        conversion[digit] = 1;
        conversion[1] = digit;
      }
      if (digit.length === 3) {
        conversion[digit] = 7;
        conversion[7] = digit;
      }
      if (digit.length === 4) {
        conversion[digit] = 4;
        conversion[4] = digit;
      }
      if (digit.length === 7) {
        conversion[digit] = 8;
        conversion[8] = digit;
      }
    }

    for (const digit of digits) {
      if (conversion[digit] !== undefined) continue;
      if (digit.length === 6) {
        // 0, 6, 9
        // 9 contains 4
        // 0 contains 1
        // 6
        if (conversion[4].split('').every((letter) => digit.includes(letter))) {
          conversion[digit] = 9;
          conversion[9] = digit;
          break;
        }
      }
    }

    for (const digit of digits) {
      if (conversion[digit] !== undefined) continue;
      if (digit.length === 6) {
        // 0, 6, 9
        // 9 contains 4
        // 0 contains 1
        // 6
        if (conversion[1].split('').every((letter) => digit.includes(letter))) {
          conversion[digit] = 0;
          conversion[0] = digit;
          break;
        }
      }
    }

    for (const digit of digits) {
      if (conversion[digit] !== undefined) continue;
      if (digit.length === 6) {
        // 0, 6, 9
        // 9 contains 4
        // 0 contains 1
        // 6
        conversion[digit] = 6;
        conversion[6] = digit;
        break;
      }
    }

    for (const digit of digits) {
      if (conversion[digit] !== undefined) continue;
      if (digit.length === 5) {
        // 2, 3, 5
        // 3 contains 1
        // 9 contains 5
        // 2
        if (conversion[1].split('').every((letter) => digit.includes(letter))) {
          conversion[digit] = 3;
          conversion[3] = digit;
          break;
        }
      }
    }

    for (const digit of digits) {
      if (conversion[digit] !== undefined) continue;
      if (digit.length === 5) {
        // 2, 3, 5
        // 3 contains 1
        // 9 contains 5
        // 2
        if (digit.split('').every((letter) => conversion[9].includes(letter))) {
          conversion[digit] = 5;
          conversion[5] = digit;
          break;
        }
      }
    }

    for (const digit of digits) {
      if (conversion[digit] !== undefined) continue;
      if (digit.length === 5) {
        // 2, 3, 5
        // 3 contains 1
        // 9 contains 5
        // 2
        conversion[digit] = 2;
        conversion[2] = digit;
        break;
      }
    }

    let sum = '';
    for (const o of output) {
      sum += `${conversion[o.split('').sort().join('')]}`;
    }

    // Map output to 4 digit, then sum
    result += parseInt(sum);
  }

  return result;
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
// const data = fs.readFileSync('test_input2.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')
  .map((line) => line.split(' | ').map((part) => part.split(' ')));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
