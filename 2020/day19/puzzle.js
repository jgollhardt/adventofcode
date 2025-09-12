import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 171
const puzzle1 = (lines) => {
  let [rules, msgs] = lines;

  let R = {};
  rules.split('\n').forEach((rule) => {
    const [key, r] = rule.split(': ');
    R[key] = r;
  });

  while (/\d/.test(R[0])) {
    R[0] = R[0].replace(/\d+/g, (match) => `(${R[match]})`);
  }

  let reg = R[0].replace(/[ "]/g, '');
  reg = new RegExp(`^${reg}$`);

  msgs = msgs.split('\n').filter((msg) => reg.test(msg));

  return msgs.length;
};

// 369
const puzzle2 = (lines) => {
  let [rules, msgs] = lines;

  let R = {};
  rules.split('\n').forEach((rule) => {
    const [key, r] = rule.split(': ');
    R[key] = r;
  });

  R[8] = '42+';

  let str = '42 31';
  let rule = str;
  for (let i = 0; i < 4; i++) {
    str = `42 ${str} 31`;
    rule += ` | ${str}`;
  }
  R[11] = rule;

  while (/\d/.test(R[0])) {
    R[0] = R[0].replace(/\d+/g, (match) => {
      return `(${R[match]})`;
    });
  }

  let reg = R[0].replace(/[ "]/g, '');
  reg = new RegExp(`^${reg}$`);

  let result = msgs.split('\n').filter((msg) => reg.test(msg));

  return result.length;
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
