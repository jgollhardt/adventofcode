import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

const printCups = (cupMap, cup) => {
  let cupString = `cups: (${cup})`;
  let next = cupMap[cup];
  while (next !== cup) {
    cupString += ` ${next}`;
    next = cupMap[next];
  }

  console.log(cupString);
};

// 49576328
const puzzle1 = (cups, max = 9, cycles = 100) => {
  // Keep track of adjacent cups using a hash table
  const cupMap = _.transform(
    cups,
    (result, cup, ind) => {
      result[cup] = cups[ind + 1];
    },
    {}
  );
  cupMap[_.last(cups)] = cups[0];

  let cup = cups[0];
  _.range(cycles).forEach((i) => {
    const next = cupMap[cup];
    const nextNext = cupMap[next];
    const nextNextNext = cupMap[nextNext];

    // Grab the next lowest index, wrapping around to max
    let dest = cup - 1;
    if (dest < 1) dest = max;
    while ([next, nextNext, nextNextNext].includes(dest)) {
      dest -= 1;
      if (dest < 1) dest = max;
    }

    // console.log(`-- move ${i + 1} --`);
    // printCups(cupMap, cup);
    // console.log(`pick up: ${next}, ${nextNext}, ${nextNextNext}`);
    // console.log(`destination: ${dest}\n`);

    // Need to swap the current cups next position with the one three cups away
    cupMap[cup] = cupMap[nextNextNext];

    // Need to swap the dest cups next with the moved cup, and swap the cup three cups away dest with the dest cups
    cupMap[nextNextNext] = cupMap[dest];

    cupMap[dest] = next;

    cup = cupMap[cup];
  });

  // printCups(cupMap, cup);
  return cupMap;
};

// 511780369955
const puzzle2 = (cups) => {
  cups = [...cups, ..._.range(10, 1000001)];
  const cupMap = puzzle1(cups, 1000000, 10000000);
  return cupMap[1] * cupMap[cupMap[1]];
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')[0]
  .split('')
  .map((x) => parseInt(x));
printCups(puzzle1(lines), 1);
console.log(puzzle2(lines));
