import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 3421
const puzzle1 = (lines) => {
  const links = {};
  lines.forEach(([start, end]) => {
    if (!links[start]) links[start] = [];
    if (!links[end]) links[end] = [];
    links[start].push(end);
    links[end].push(start);
  });

  const seen = new Set();
  const paths = [['start']];
  while (paths.length > 0) {
    const path = paths.pop();
    if (seen.has(path.toString())) continue;
    seen.add(path.toString());
    const lastCave = path[path.length - 1];
    const destinations = links[lastCave];
    const nextPaths = destinations
      .map((nextCave) => {
        // don't revisit small caves
        if (nextCave.toLowerCase() === nextCave) {
          if (path.includes(nextCave)) return;
        }
        return [...path, nextCave];
      })
      .filter((nextPath) => nextPath);
    paths.push(...nextPaths);
  }

  // For paths in seen that have the last element "end"
  return Array.from(seen).filter((path) => {
    const realPath = path.split(',');
    return realPath[realPath.length - 1] === 'end';
  }).length;
};

// 84870
const puzzle2 = (lines) => {
  const links = {};
  lines.forEach(([start, end]) => {
    if (!links[start]) links[start] = [];
    if (!links[end]) links[end] = [];
    links[start].push(end);
    links[end].push(start);
  });

  const seen = new Set();
  const paths = [{ smallVisited: false, path: ['start'] }];
  while (paths.length > 0) {
    const { path, smallVisited } = paths.pop();
    if (seen.has(path.toString())) continue;
    seen.add(path.toString());
    const lastCave = path[path.length - 1];
    if (lastCave === 'end') continue;
    const destinations = links[lastCave];
    const nextPaths = destinations
      .map((nextCave) => {
        if (nextCave === 'start') return;
        // don't revisit small caves
        if (nextCave.toLowerCase() === nextCave) {
          if (path.includes(nextCave) && smallVisited) return;
          if (path.includes(nextCave) && !smallVisited)
            return { smallVisited: true, path: [...path, nextCave] };
        }
        return { smallVisited, path: [...path, nextCave] };
      })
      .filter((nextPath) => nextPath);
    paths.push(...nextPaths);
  }

  // For paths in seen that have the last element "end"
  return Array.from(seen).filter((path) => {
    const realPath = path.split(',');
    return realPath[realPath.length - 1] === 'end';
  }).length;
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')
  .map((line) => line.split('-'));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
