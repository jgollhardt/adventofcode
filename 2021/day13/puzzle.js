import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

const printMap = (map) => {
  for (let y = 0; y < 6; y++) {
    let line = '';
    for (let x = 0; x < 39; x++) {
      if (map.has([x, y].toString())) {
        line += '#';
      } else {
        line += '.';
      }
    }
    console.log(line);
  }
};

// 759
const puzzle1 = (lines) => {
  const [pointLines, foldLines] = lines;
  const map = new Set();
  pointLines.forEach((line) => {
    const row = parseInt(line.split(',')[0]);
    const col = parseInt(line.split(',')[1]);
    map.add([row, col].toString());
  });

  const folds = foldLines.map((line) =>
    line.replace('fold along ', '').split('=')
  );

  let [axis, num] = folds[0];
  num = parseInt(num);

  const newMap = new Set();
  if (axis === 'x') {
    map.forEach((point) => {
      const [x, y] = point.split(',').map((num) => parseInt(num));
      // need to flip x across y
      if (x > num) {
        newMap.add([x - 2 * Math.abs(x - num), y].toString());
      } else {
        newMap.add([x, y].toString());
      }
    });
  } else {
    map.forEach((point) => {
      const [x, y] = point.split(',').map((num) => parseInt(num));
      // need to flip y across x
      if (y > num) {
        newMap.add([x, y - 2 * Math.abs(y - num)].toString());
      } else {
        newMap.add([x, y].toString());
      }
    });
  }

  return newMap.size;
};

// HECRZKPR
const puzzle2 = (lines) => {
  const [pointLines, foldLines] = lines;
  let map = new Set();
  pointLines.forEach((line) => {
    const row = parseInt(line.split(',')[0]);
    const col = parseInt(line.split(',')[1]);
    map.add([row, col].toString());
  });

  const folds = foldLines.map((line) =>
    line.replace('fold along ', '').split('=')
  );

  folds.forEach((fold) => {
    let [axis, num] = fold;
    num = parseInt(num);

    const newMap = new Set();
    if (axis === 'x') {
      map.forEach((point) => {
        const [x, y] = point.split(',').map((num) => parseInt(num));
        // need to flip x across y
        if (x > num) {
          newMap.add([x - 2 * Math.abs(x - num), y].toString());
        } else {
          newMap.add([x, y].toString());
        }
      });
    } else {
      map.forEach((point) => {
        const [x, y] = point.split(',').map((num) => parseInt(num));
        // need to flip y across x
        if (y > num) {
          newMap.add([x, y - 2 * Math.abs(y - num)].toString());
        } else {
          newMap.add([x, y].toString());
        }
      });
    }
    map = newMap;
  });

  printMap(map);
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n\n')
  .map((section) => section.split('\n'));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
