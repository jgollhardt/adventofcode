import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

const printSeats = (seats) => {
  const minX = Math.min(
    ...Object.keys(seats).map((seat) => seat.split(',')[0])
  );
  const maxX = Math.max(
    ...Object.keys(seats).map((seat) => seat.split(',')[0])
  );
  const minY = Math.min(
    ...Object.keys(seats).map((seat) => seat.split(',')[1])
  );
  const maxY = Math.max(
    ...Object.keys(seats).map((seat) => seat.split(',')[1])
  );
  // console.log(minX, maxX, minY, maxY);
  for (let x = minX; x <= maxX; x++) {
    let string = '';
    for (let y = minY; y <= maxY; y++) {
      string += seats[[x, y]] || '.';
    }
    console.log(string);
  }
  console.log();
};

// 2126
const puzzle1 = (lines) => {
  let seats = {};
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === 'L') {
        seats[[i, j]] = 'L';
      }
    }
  }
  // printSeats(seats);

  const seen = [];
  let count = 0;
  while (!_.some(seen, seats)) {
    // console.log(seats);
    // if (count === 5) break;

    seen.push(seats);
    const newSeats = { ...seats };
    _.forEach(seats, (val, key) => {
      let [i, j] = key.split(',');
      i = parseInt(i);
      j = parseInt(j);

      let occs = 0;
      _.range(-1, 2).forEach((di) => {
        _.range(-1, 2).forEach((dj) => {
          if (di === 0 && dj === 0) return;

          if (seats[[i + di, j + dj]] === '#') {
            occs++;
          }
        });
      });

      // console.log(occs);

      if (val === 'L' && occs === 0) {
        newSeats[key] = '#';
      } else if (val === '#' && occs >= 4) {
        newSeats[key] = 'L';
      }
    });

    seats = newSeats;
    // printSeats(seats);

    count++;
  }

  // Return number of filled seats
  let result = 0;
  _.forEach(seats, (seat) => {
    if (seat === '#') result++;
  });
  return result;
};

const puzzle2 = (lines) => {
  let seats = {};
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === 'L') {
        seats[[i, j]] = 'L';
      } else {
        seats[[i, j]] = '.';
      }
    }
  }
  // printSeats(seats);

  const seen = [];
  let count = 0;
  while (!_.some(seen, seats)) {
    seen.push(seats);
    const newSeats = { ...seats };
    _.forEach(seats, (val, key) => {
      let [i, j] = key.split(',');
      i = parseInt(i);
      j = parseInt(j);

      let occs = 0;
      _.range(-1, 2).forEach((di) => {
        _.range(-1, 2).forEach((dj) => {
          if (di === 0 && dj === 0) return;

          let newI = i + di;
          let newJ = j + dj;
          while (seats[[newI, newJ]]) {
            if (seats[[newI, newJ]] === '.') {
              newI += di;
              newJ += dj;
            }
            if (seats[[newI, newJ]] === '#') {
              occs++;
              break;
            }
            if (seats[[newI, newJ]] === 'L') break;
          }
        });
      });

      // console.log(occs);

      if (val === 'L' && occs === 0) {
        newSeats[key] = '#';
      } else if (val === '#' && occs >= 5) {
        newSeats[key] = 'L';
      }
    });

    seats = newSeats;
    // printSeats(seats);

    count++;
  }

  // Return number of filled seats
  let result = 0;
  _.forEach(seats, (seat) => {
    if (seat === '#') result++;
  });
  return result;
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
