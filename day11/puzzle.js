import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

const printSeats = (seats) => {
  console.log(seats.map((row) => row.join('')).join('\n'));
};

// 2126
const puzzle1 = (seats) => {
  while (true) {
    const newSeats = _.cloneDeep(seats);
    _.forEach(seats, (row, i) => {
      _.forEach(row, (seat, j) => {
        let numOccupied = 0;
        _.range(-1, 2).forEach((di) => {
          _.range(-1, 2).forEach((dj) => {
            if (di === 0 && dj === 0) return;
            if (seats[i + di] && seats[i + di][j + dj] === '#') {
              numOccupied++;
            }
          });
        });

        if (seat === 'L' && numOccupied === 0) {
          newSeats[i][j] = '#';
        }
        if (seat === '#' && numOccupied >= 4) {
          newSeats[i][j] = 'L';
        }
      });
    });

    // printSeats(newSeats);

    if (_.isEqual(seats, newSeats)) break;

    seats = newSeats;
  }

  // Return number of filled seats
  return _.sumBy(seats, (row) => _.sumBy(row, (seat) => seat === '#'));
};

// 1914
const puzzle2 = (seats) => {
  while (true) {
    const newSeats = _.cloneDeep(seats);
    _.forEach(seats, (row, i) => {
      _.forEach(row, (seat, j) => {
        let numOccupied = 0;
        _.range(-1, 2).forEach((di) => {
          _.range(-1, 2).forEach((dj) => {
            if (di === 0 && dj === 0) return;

            let newI = i + di;
            let newJ = j + dj;
            let newSeat = seats[newI] && seats[newI][newJ];
            while (newSeat === '.') {
              newI += di;
              newJ += dj;
              newSeat = seats[newI] && seats[newI][newJ];
            }

            if (newSeat === '#') {
              numOccupied++;
            }
          });
        });

        if (seat === 'L' && numOccupied === 0) {
          newSeats[i][j] = '#';
        }
        if (seat === '#' && numOccupied >= 5) {
          newSeats[i][j] = 'L';
        }
      });
    });

    // printSeats(newSeats);

    if (_.isEqual(seats, newSeats)) break;

    seats = newSeats;
  }

  // Return number of filled seats
  return _.sumBy(seats, (row) => _.sumBy(row, (seat) => seat === '#'));
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')
  .map((line) => line.split(''));
console.log(puzzle1(lines));
console.log(puzzle2(lines));
