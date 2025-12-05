import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 821
const puzzle1 = (input: Input) => {
  const { ids, ranges } = input;

  let result = 0;
  ids.map((id) => {
    if (
      ranges.some((range) => {
        return id >= range[0] && id <= range[1];
      })
    ) {
      result += 1;
    }
  });

  return result;
};

// 344771884978261
const puzzle2 = (input: Input) => {
  const { ranges } = input;

  // collapse ranges
  let newRanges: typeof ranges = [];
  ranges.map((range) => {
    let foundRanges = [];
    newRanges = newRanges.filter((newRange) => {
      // collect all overlapping ranges so we can combine them
      if (range[1] >= newRange[0] && range[0] <= newRange[1]) {
        foundRanges.push(newRange);
        return false;
      }

      return true;
    });

    // merge all found ranges into one range
    if (foundRanges.length > 0) {
      foundRanges.push(range);

      newRanges.push([
        Math.min(...foundRanges.map((r) => r[0])),
        Math.max(...foundRanges.map((r) => r[1])),
      ]);
    } else {
      newRanges.push(range);
    }
  });

  let result = 0;
  newRanges.map((range) => {
    result += range[1] - range[0] + 1;
  });

  return result;
};

await fetchInput();

// const data = fs.readFileSync('test_input.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const [rawRanges, rawIds] = data.trim().split('\n\n');
const ranges = rawRanges
  .split('\n')
  .map((range) => range.split('-').map((s) => +s));
const ids = rawIds.split('\n').map((s) => +s);
const input = { ranges, ids };
type Input = typeof input;

console.log(puzzle1(input));
console.log(puzzle2(input));
