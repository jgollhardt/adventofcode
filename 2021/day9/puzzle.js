import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 528
const puzzle1 = (lines) => {
  let result = 0;
  for (let row = 0; row < lines.length; row++) {
    const line = lines[row];
    for (let col = 0; col < line.length; col++) {
      const num = line[col];
      const dirs = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      if (
        dirs.every(([dx, dy]) => {
          const neighbor =
            lines[row + dx]?.[col + dy] ?? Number.MAX_SAFE_INTEGER;
          return neighbor > num;
        })
      ) {
        result += num + 1;
      }
    }
  }
  return result;
};

// 920448
// Using a disjoint-set approach
const puzzle2 = (lines) => {
  let basins = {};
  let tag = 1;
  for (let row = 0; row < lines.length; row++) {
    const line = lines[row];
    for (let col = 0; col < line.length; col++) {
      const num = line[col];
      if (num === 9) continue;

      const dirs = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      // Put point in same tag as neighbors, unless the neighbor is nine
      // If neighbors have no tag, start a new one
      // If neighbors with different tags, need to merge them
      dirs.forEach(([dx, dy]) => {
        const neighbor = lines[row + dx]?.[col + dy];

        if (neighbor === undefined) return;
        if (neighbor === 9) return;

        const neighborTag = basins[[row + dx, col + dy]];
        const currentTag = basins[[row, col]];
        if (neighborTag && !currentTag) {
          basins[[row, col]] = neighborTag;
          basins[neighborTag].push([row, col]);
        }

        // merge tags
        if (neighborTag && currentTag && neighborTag !== currentTag) {
          // uh switching to neighbors, fuck my tag
          for (const pos of basins[currentTag]) {
            basins[pos] = neighborTag;
          }
          basins[neighborTag].push(...basins[currentTag]);
          delete basins[currentTag];
        }
      });

      // start new tag if none was found
      const currentTag = basins[[row, col]];
      if (!currentTag) {
        basins[[row, col]] = tag;
        basins[tag] = [[row, col]];
        tag += 1;
      }
    }
  }

  let basinSizes = [];
  for (let i = 1; i < tag; i++) {
    if (basins[i]) basinSizes.push(basins[i].length);
  }

  basinSizes.sort(function (a, b) {
    return b - a;
  });
  return basinSizes[0] * basinSizes[1] * basinSizes[2];
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')
  .map((line) => line.split('').map((num) => parseInt(num)));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
