import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 2470
const puzzle1 = (lines) => {
  lines = _.sortBy(lines);
  let num = 0;
  let result_1 = 0;
  let result_3 = 1;
  for (const line of lines) {
    const diff = line - num;
    if (diff === 1) result_1 += 1;
    if (diff === 3) result_3 += 1;
    num = line;
  }
  return result_1 * result_3;
};

const numCombinations = (adapters, num, cache = {}) => {
  const possibleChildren = _.range(num + 1, num + 4);
  const foundAdapters = _.filter(possibleChildren, (x) => adapters.has(x));

  if (foundAdapters.length === 0) return 1;

  if (cache[num]) return cache[num];

  const count = _.sumBy(foundAdapters, (adapter) =>
    numCombinations(adapters, adapter, cache)
  );
  cache[num] = count;
  return count;
};

// 1973822685184
const puzzle2 = (lines) => {
  return numCombinations(new Set(lines), 0);
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')
  .map((num) => parseInt(num));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
