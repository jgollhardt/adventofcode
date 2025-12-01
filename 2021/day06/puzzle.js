import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 377263
const puzzle1 = (lines) => {
  let fish = [...lines];

  for (let i = 0; i < 80; i++) {
    const newFish = fish.map((fish) => fish - 1);
    for (let j = 0; j < fish.length; j++) {
      if (fish[j] === 0) {
        newFish[j] = 6;
        newFish.push(8);
      }
    }
    fish = newFish;
  }

  return fish.length;
};

// 1695929023803
const puzzle2 = (lines) => {
  let fish = {};
  for (const line of lines) {
    fish[line] = (fish[line] ?? 0) + 1;
  }

  for (let i = 0; i < 256; i++) {
    const newFish = {};
    for (const day in fish) {
      if (day === '0') {
        newFish[6] = (newFish[6] ?? 0) + fish[day];
        newFish[8] = fish[day];
      } else {
        newFish[day - 1] = (newFish[day - 1] ?? 0) + fish[day];
      }
    }
    fish = newFish;
  }

  return _.sum(Object.values(fish));
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split(',')
  .map((line) => parseInt(line));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
