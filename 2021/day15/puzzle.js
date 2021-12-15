import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 487
const puzzle1 = (lines) => {
  let paths = [{ path: [[0, 0]], risk: 0 }];
  const seen = {};
  while (paths.length > 0) {
    const { path, risk } = paths.shift();
    const lastPos = path[path.length - 1];
    const existingRisk = seen[lastPos.toString()];
    if (existingRisk !== undefined) {
      continue;
    } else {
      seen[lastPos.toString()] = risk;
    }

    const dirs = [
      [0, 1],
      [0, -1],
      [-1, 0],
      [1, 0],
    ];
    dirs.forEach((dir) => {
      const newX = lastPos[0] + dir[0];
      const newY = lastPos[1] + dir[1];
      if (lines[newY] && lines[newY][newX] !== undefined) {
        const newRisk = risk + lines[newY][newX];
        paths.push({
          path: [...path, [newX, newY]],
          risk: newRisk,
        });
      }
    });

    // sort paths with lowest risk first
    paths = paths.sort((pathA, pathB) => pathA.risk - pathB.risk);
  }

  // not 46462
  return seen[[lines.length - 1, lines[0].length - 1].toString()];
};

// 2821
const puzzle2 = (oldLines) => {
  const newLines = [];
  oldLines.forEach((oldRow) => {
    let newRow = [];
    for (let i = 0; i < 5; i++) {
      newRow.push(...oldRow.map((num) => ((num + i - 1) % 9) + 1));
    }
    newLines.push(newRow);
  });

  const lines = [];
  for (let i = 0; i < 5; i++) {
    newLines.forEach((line) => {
      lines.push(line.map((num) => ((num + i - 1) % 9) + 1));
    });
  }

  return puzzle1(lines);
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')
  .map((line) => line.split('').map((x) => parseInt(x)));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
