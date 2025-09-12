import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 318099
const puzzle1 = (lines) => {
  const openers = ['(', '[', '{', '<'];
  const closers = [')', ']', '}', '>'];
  const scores = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
  let result = 0;
  lines.forEach((line) => {
    const stack = [];
    let bad;
    line.forEach((char) => {
      if (bad) return;

      if (openers.includes(char)) {
        stack.push(char);
      } else {
        if (stack.length === 0) {
          bad = char;
        } else {
          const last = stack.pop();
          if (openers.indexOf(last) !== closers.indexOf(char)) {
            bad = char;
          }
        }
      }
    });

    if (bad) result += scores[bad];
  });
  return result;
};

// 2389738699
const puzzle2 = (lines) => {
  const openers = ['(', '[', '{', '<'];
  const closers = [')', ']', '}', '>'];
  const scores = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
  let result = [];
  lines.forEach((line) => {
    let score = 0;
    const stack = [];
    let bad;
    line.forEach((char) => {
      if (bad) return;

      if (openers.includes(char)) {
        stack.push(char);
      } else {
        if (stack.length === 0) {
          bad = char;
        } else {
          const last = stack.pop();
          if (openers.indexOf(last) !== closers.indexOf(char)) {
            bad = char;
          }
        }
      }
    });

    if (!bad) {
      stack.reverse().forEach((char) => {
        score *= 5;
        score += openers.indexOf(char) + 1;
      });
      result.push(score);
    }
  });

  return result.sort((a, b) => a - b)[(result.length - 1) / 2];
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')
  .map((line) => line.split(''));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
