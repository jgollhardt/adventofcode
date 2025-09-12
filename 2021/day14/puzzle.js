import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 3143
const puzzle1 = (lines) => {
  let [polymer, insertionLines] = lines;
  const insertions = {};
  insertionLines.split('\n').forEach((line) => {
    const [left, right] = line.split(' -> ');
    insertions[left] = right;
  });

  for (let n = 0; n < 10; n++) {
    let newPolymer = [];
    for (let i = 0; i < polymer.length - 1; i++) {
      const part = polymer[i] + polymer[i + 1];
      const insertion = insertions[part];
      newPolymer.push(polymer[i]);
      if (insertion) {
        newPolymer.push(insertion);
      }
    }
    newPolymer.push(polymer[polymer.length - 1]);
    polymer = newPolymer;
  }

  let count = {};
  for (let i = 0; i < polymer.length; i++) {
    count[polymer[i]] = (count[polymer[i]] ?? 0) + 1;
  }

  const counts = Object.values(count);
  return Math.max(...counts) - Math.min(...counts);
};

// 4110215602456
const puzzle2 = (lines) => {
  let [polymer, insertionLines] = lines;
  const insertions = {};
  insertionLines.split('\n').forEach((line) => {
    const [left, right] = line.split(' -> ');
    insertions[left] = right;
  });

  let pairCounts = {};
  for (let i = 0; i < polymer.length - 1; i++) {
    pairCounts[polymer.slice(i, i + 2)] =
      (pairCounts[polymer.slice(i, i + 2)] ?? 0) + 1;
  }

  // how many pairs does any pair generate
  for (let n = 0; n < 40; n++) {
    let newPairCounts = {};
    Object.entries(pairCounts).forEach(([pair, count]) => {
      const insertion = insertions[pair];
      newPairCounts[pair[0] + insertion] =
        (newPairCounts[pair[0] + insertion] ?? 0) + count;
      newPairCounts[insertion + pair[1]] =
        (newPairCounts[insertion + pair[1]] ?? 0) + count;
    });
    pairCounts = newPairCounts;
  }

  let counts = { [polymer[0]]: 1, [polymer[polymer.length - 1]]: 1 };
  Object.entries(pairCounts).forEach(([pair, count]) => {
    counts[pair[0]] = (counts[pair[0]] ?? 0) + count;
    counts[pair[1]] = (counts[pair[1]] ?? 0) + count;
  });
  counts = Object.values(counts);
  counts = counts.map((count) => count / 2);
  return Math.max(...counts) - Math.min(...counts);
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
