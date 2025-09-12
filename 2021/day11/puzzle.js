import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

const printMap = (i, map) => {
  console.log(`\nAfter Step ${i}:`);
  for (let row = 0; row < 10; row++) {
    let logPayload = '';
    for (let col = 0; col < 10; col++) {
      logPayload += map[[row, col]];
    }
    console.log(`${logPayload}`);
  }
};

// 1729
const puzzle1 = (lines) => {
  const map = {};
  lines.forEach((line, row) => {
    line.forEach((num, col) => {
      map[[row, col]] = num;
    });
  });

  let result = 0;
  for (let i = 0; i < 100; i++) {
    const firedUp = new Set();
    let numFiredUp = -1;

    // increment each octopus by 1
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        map[[row, col]] += 1;
      }
    }

    // figure out what octopous are fired up
    while (firedUp.size !== numFiredUp) {
      numFiredUp = firedUp.size;
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          if (firedUp.has(`${row},${col}`)) continue;
          // if fired up, make sure to incremend 8 neighbors
          if (map[[row, col]] > 9) {
            firedUp.add(`${row},${col}`);
            for (let drow = -1; drow <= 1; drow++) {
              for (let dcol = -1; dcol <= 1; dcol++) {
                if (drow === 0 && dcol === 0) continue;
                if (map[[row + drow, col + dcol]] !== undefined) {
                  map[[row + drow, col + dcol]] += 1;
                }
              }
            }
          }
        }
      }
    }

    // reset all flashed octopuses
    firedUp.forEach((hypedOctopus) => {
      const row = parseInt(hypedOctopus.split(',')[0]);
      const col = parseInt(hypedOctopus.split(',')[1]);
      map[[row, col]] = 0;
    });

    // printMap(i, map);

    result += firedUp.size;
  }

  return result;
};

// 237
const puzzle2 = (lines) => {
  const map = {};
  lines.forEach((line, row) => {
    line.forEach((num, col) => {
      map[[row, col]] = num;
    });
  });

  let result = 0;
  for (let i = 0; true; i++) {
    const firedUp = new Set();
    let numFiredUp = -1;

    // increment each octopus by 1
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        map[[row, col]] += 1;
      }
    }

    // figure out what octopous are fired up
    while (firedUp.size !== numFiredUp) {
      numFiredUp = firedUp.size;
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          if (firedUp.has(`${row},${col}`)) continue;
          // if fired up, make sure to incremend 8 neighbors
          if (map[[row, col]] > 9) {
            firedUp.add(`${row},${col}`);
            for (let drow = -1; drow <= 1; drow++) {
              for (let dcol = -1; dcol <= 1; dcol++) {
                if (drow === 0 && dcol === 0) continue;
                if (map[[row + drow, col + dcol]] !== undefined) {
                  map[[row + drow, col + dcol]] += 1;
                }
              }
            }
          }
        }
      }
    }

    if (numFiredUp === 100) return i + 1;

    // reset all flashed octopuses
    firedUp.forEach((hypedOctopus) => {
      const row = parseInt(hypedOctopus.split(',')[0]);
      const col = parseInt(hypedOctopus.split(',')[1]);
      map[[row, col]] = 0;
    });

    // printMap(i, map);

    result += firedUp.size;
  }
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
