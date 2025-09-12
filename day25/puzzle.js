import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

// 6198540
const puzzle1 = (lines) => {
  const [pub1, pub2] = lines.map((line) => parseInt(line));

  let val = 1;
  let sub = 7;
  let round = 0;
  while (val !== pub1) {
    val *= sub;
    val %= 20201227;
    round += 1;
  }

  val = 1;
  sub = pub2;
  _.range(round).forEach((i) => {
    val *= sub;
    val %= 20201227;
  });

  return val;
};

const puzzle2 = (lines) => {};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
