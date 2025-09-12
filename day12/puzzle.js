import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

// 1645
const puzzle1 = (lines) => {
  const dirs = ['N', 'E', 'S', 'W'];
  let direction = 1;
  let x = 0;
  let y = 0;
  for (const { dir, dist } of lines) {
    let d = dir;
    if (d === 'F') d = dirs[direction];

    if (d === 'N') y += dist;
    if (d === 'S') y -= dist;
    if (d === 'E') x += dist;
    if (d === 'W') x -= dist;

    if (d === 'L') direction = (direction - dist / 90 + 4) % 4;
    if (d === 'R') direction = (direction + dist / 90) % 4;
  }

  return Math.abs(x) + Math.abs(y);
};

// 35292
const puzzle2 = (lines) => {
  let dx = 10;
  let dy = 1;
  let x = 0;
  let y = 0;
  for (let { dir, dist } of lines) {
    let d = dir;
    if (d === 'F') {
      x += dx * dist;
      y += dy * dist;
    }

    if (d === 'N') dy += dist;
    if (d === 'S') dy -= dist;
    if (d === 'E') dx += dist;
    if (d === 'W') dx -= dist;

    if (d === 'L') {
      while (dist) {
        [dx, dy] = [-dy, dx];
        dist -= 90;
      }
    }

    if (d === 'R') {
      while (dist) {
        [dx, dy] = [dy, -dx];
        dist -= 90;
      }
    }
  }

  return Math.abs(x) + Math.abs(y);
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')
  .map((line) => {
    const dir = line[0];
    const dist = parseInt(line.slice(1));
    return { dir, dist };
  });
console.log(puzzle1(lines));
console.log(puzzle2(lines));
