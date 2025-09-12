import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 800602729153
const puzzle1 = (lines) => {
  lines = `( ${lines.join(' ) + ( ')} )`;

  while (/\(/.test(lines)) {
    const group = /\(([^()]+)\)/g;
    lines = lines.replace(group, (match, expr) => {
      const lhs = /\d+ . \d+/;
      while (lhs.test(expr)) {
        expr = expr.replace(lhs, eval);
      }
      return expr;
    });
  }

  return eval(lines);
};

// 92173009047076
const puzzle2 = (lines) => {
  lines = `( ${lines.join(' ) + ( ')} )`;

  while (/\(/.test(lines)) {
    const group = /\(([^()]+)\)/g;
    lines = lines.replace(group, (match, expr) => {
      const addition = /\d+( \+ \d+)+/g;
      expr = expr.replace(addition, eval);
      return eval(expr);
    });
  }

  return eval(lines);
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
