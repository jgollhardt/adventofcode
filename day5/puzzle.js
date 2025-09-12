import fs from 'fs';
import { userInfo } from 'os';
import { fetchInput } from '../utils/fetch.js';

// 842
const puzzle1 = (lines) => {
  let maxId = 0;
  lines.forEach((line) => {
    line = line.replace(/[BR]/g, '1').replace(/[FL]/g, '0');
    const row = parseInt(line.slice(0, 7), 2);
    const col = parseInt(line.slice(7, 10), 2);
    maxId = Math.max(maxId, 8 * row + col);
  });

  return maxId;
};

// 617
const puzzle2 = (lines) => {
  let maxId = 0;
  let minId = Number.MAX_SAFE_INTEGER;
  const ids = new Set();
  lines.forEach((line) => {
    line = line.replace(/[BR]/g, '1').replace(/[FL]/g, '0');
    const row = parseInt(line.slice(0, 7), 2);
    const col = parseInt(line.slice(7, 10), 2);
    const id = row * 8 + col;
    maxId = Math.max(maxId, id);
    minId = Math.min(minId, id);
    ids.add(id);
  });

  for (let i = minId; i < maxId; i++) {
    if (!ids.has(i)) return i;
  }
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n'); // .map(line => parseInt(line));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
