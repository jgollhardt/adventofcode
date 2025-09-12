import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 842
const puzzle1 = (lines) => {
  return _(lines)
    .map((line) => {
      return parseInt(line.replace(/[BR]/g, '1').replace(/[FL]/g, '0'), 2);
    })
    .max();
};

// 617
const puzzle2 = (lines) => {
  const ids = lines.map((line) => {
    return parseInt(line.replace(/[BR]/g, '1').replace(/[FL]/g, '0'), 2);
  });

  const maxId = _.max(ids);
  const minId = _.min(ids);
  return (maxId * (maxId + 1) - minId * (minId - 1)) / 2 - _.sum(ids);
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
