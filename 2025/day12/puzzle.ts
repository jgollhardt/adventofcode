import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 408
const puzzle1 = (input: Input) => {
  const { boxes, regions } = input;
  // Rule out any that have present size > box area
  let result = 0;
  for (const {
    bounds: [x, y],
    counts,
  } of regions) {
    const presentSize = counts.reduce(
      (acc, c, i) => acc + c * boxes[i].size,
      0
    );

    // Can ignore presents that could never fit ... and turns out that's the solution
    if (x * y < presentSize) {
      continue;
    }

    result++;
  }

  return result;
};

await fetchInput();

// const data = fs.readFileSync('test_input.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');

const rawData = data.replace(/\n$/, '').split('\n\n');
const regions = rawData
  .pop()!
  .split('\n')
  .map((region) => {
    const [size, ...counts] = region.split(' ');
    return {
      bounds: size
        .slice(0, -1)
        .split('x')
        .map((n) => +n),
      counts: counts.map((c) => +c),
    };
  });
const boxes = rawData.map((box) => {
  let n = 0;
  box.split('').map((c) => {
    if (c === '#') {
      n++;
    }
  });
  return {
    area: box.split('\n').slice(1),
    size: n,
  };
});

const input = { boxes, regions };
type Input = typeof input;

console.log(puzzle1(input));
