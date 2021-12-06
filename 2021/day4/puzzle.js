import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 11536
const puzzle1 = (lines) => {
  const [numberlines, ...boardlines] = lines;
  const numbers = numberlines.split(',');
  const boards = boardlines.map((line) => {
    return line.split('\n').map((row) => row.trim().split(/ +/));
  });

  for (let i = 5; i < numbers.length; i++) {
    const called = numbers.slice(0, i);

    let bingo = false;
    for (const board of boards) {
      // Go through all winnning combinations, see if they've been called
      for (let i = 0; i < 5; i++) {
        if (board[i].every((number) => called.includes(number))) bingo = true;
      }
      for (let i = 0; i < 5; i++) {
        const col = board.map((row) => row[i]);
        if (col.every((number) => called.includes(number))) bingo = true;
      }

      if (bingo === true) {
        const uncalledSum = _.sumBy(board, (row) => {
          return _.sumBy(row, (number) =>
            called.includes(number) ? 0 : parseInt(number)
          );
        });
        const lastCalled = parseInt(called.slice(-1)[0]);
        return uncalledSum * lastCalled;
      }
    }
  }
};

// 1284
const puzzle2 = (lines) => {
  const [numberlines, ...boardlines] = lines;
  const numbers = numberlines.split(',');
  const boards = boardlines.map((line) => {
    return line.split('\n').map((row) => row.trim().split(/ +/));
  });

  let bingo = new Array(boards.length).fill(0);
  for (let i = 5; i < numbers.length; i++) {
    const called = numbers.slice(0, i);

    for (const boardInd in boards) {
      const board = boards[boardInd];
      // Go through all winnning combinations, see if they've been called
      for (let i = 0; i < 5; i++) {
        const col = board.map((row) => row[i]);
        if (
          board[i].every((number) => called.includes(number)) ||
          col.every((number) => called.includes(number))
        ) {
          bingo[boardInd] += 1;
          break;
        }
      }

      if (bingo.every((bingo) => bingo)) {
        const lastBoard = boards[bingo.indexOf(1)];
        const uncalledSum = _.sumBy(lastBoard, (row) => {
          return _.sumBy(row, (number) =>
            called.includes(number) ? 0 : parseInt(number)
          );
        });
        const lastCalled = parseInt(called.slice(-1)[0]);
        return uncalledSum * lastCalled;
      }
    }
  }
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
