import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

// 411
const puzzle1 = (lines) => {
  let tiles = [];
  lines.forEach((line) => {
    let tile = [];
    for (let i = 0; i < line.length; i++) {
      if (line[i] === 'n' || line[i] === 's') {
        tile.push(line.slice(i, i + 2));
        i += 1;
      } else {
        tile.push(line[i]);
      }
    }
    tiles.push(tile);
  });

  // 6 states
  const dirs = {
    e: [2, 0],
    w: [-2, 0],
    se: [1, -1],
    sw: [-1, -1],
    ne: [1, 1],
    nw: [-1, 1],
  };

  let result = {};
  tiles.forEach((tile) => {
    let x = 0;
    let y = 0;
    tile.forEach((dir) => {
      const [dx, dy] = dirs[dir];
      x += dx;
      y += dy;
    });
    if (result[[x, y]]) {
      delete result[[x, y]];
    } else {
      result[[x, y]] = 1;
    }
  });

  return { result, dirs: Object.values(dirs) };
};

// 4092
const puzzle2 = (lines) => {
  let { result, dirs } = puzzle1(lines);

  _.range(100).forEach((i) => {
    // Number of adjacent black tiles
    let adjs = {};
    _.forEach(result, (val, pos) => {
      const [x, y] = pos.split(',').map((n) => parseInt(n));
      _.forEach(dirs, ([dx, dy]) => {
        adjs[[x + dx, y + dy]] = (adjs[[x + dx, y + dy]] ?? 0) + 1;
      });
    });

    let newResult = {};
    _.forEach(adjs, (val, pos) => {
      // Black tiles with 1 neighbor remain black
      if (val === 1 && result[pos]) newResult[pos] = 1;

      // Any tile with 2 neighbors is black
      if (val === 2) newResult[pos] = 1;
    });

    result = newResult;

    // console.log(`Day ${i + 1}: ${_.size(result)}`);
  });

  return _.size(result);
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n');
console.log(_.size(puzzle1(lines).result));
console.log(puzzle2(lines));
