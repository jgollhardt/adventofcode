import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

// 33403
const puzzle1 = (lines) => {
  let [player1, player2] = lines;
  player1 = player1
    .split('\n')
    .slice(1)
    .map((i) => parseInt(i));
  player2 = player2
    .split('\n')
    .slice(1)
    .map((i) => parseInt(i));

  while (player1.length && player2.length) {
    // console.log(player1, player2);
    const top1 = player1.shift();
    const top2 = player2.shift();

    if (top1 > top2) {
      player1.push(top1, top2);
    } else {
      player2.push(top2, top1);
    }
  }

  let winner = player1.length ? player1 : player2;
  let result = 0;
  _.reverse(winner).forEach((val, i) => {
    result += val * (i + 1);
  });

  return result;
};

// 29177
const combat = (player1, player2, game = 1) => {
  // console.log(`\n=== Game ${game} ===`);

  player1 = [...player1];
  player2 = [...player2];
  let seen1 = new Set();
  let seen2 = new Set();
  let round = 1;
  while (player1.length && player2.length) {
    // console.log(`\n-- Round ${round} (Game ${game}) --`);
    // console.log(`Player 1's deck: ${player1}`);
    // console.log(`Player 2's deck: ${player2}`);

    // console.log(seen1);

    if (seen1.has(player1.join()) || seen2.has(player2.join())) {
      // console.log('infinite');
      return [true, player1, player2];
    }

    seen1.add(player1.join());
    seen2.add(player2.join());

    // console.log(player1, player2);
    const top1 = player1.shift();
    const top2 = player2.shift();

    // console.log(`Player 1 plays: ${top1}`);
    // console.log(`Player 2 plays: ${top2}`);

    if (top1 <= player1.length && top2 <= player2.length) {
      // recurse
      // console.log(`Playing a sub-game to determine the winner...`);
      let [won] = combat(
        player1.slice(0, top1),
        player2.slice(0, top2),
        game + 1
      );

      // console.log(`...anyway, back to game ${game}`);

      if (won) {
        // console.log(`Player 1 wins round ${round} of game ${game}!`);

        player1.push(top1, top2);
      } else {
        // console.log(`Player 2 wins round ${round} of game ${game}!`);

        player2.push(top2, top1);
      }
    } else if (top1 > top2) {
      // console.log(`Player 1 wins round ${round} of game ${game}!`);

      player1.push(top1, top2);
    } else {
      // console.log(`Player 2 wins round ${round} of game ${game}!`);

      player2.push(top2, top1);
    }

    round += 1;
    // if (round === 10) break;
  }

  // console.log(
  //   `The winner of game ${game} is ${
  //     player1.length > 0 ? 'player 1' : 'player 2'
  //   }!\n`
  // );

  return [player1.length > 0, player1, player2];
};

const puzzle2 = (lines) => {
  let [player1, player2] = lines;
  player1 = player1
    .split('\n')
    .slice(1)
    .map((i) => parseInt(i));
  player2 = player2
    .split('\n')
    .slice(1)
    .map((i) => parseInt(i));

  [, player1, player2] = combat(player1, player2);

  let winner = player1.length ? player1 : player2;

  let result = 0;
  _.reverse(winner).forEach((val, i) => {
    result += val * (i + 1);
  });

  return result;
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
