import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 4174964
const puzzle1 = (lines) => {
  const zeroes = new Array(lines[0].length).fill(0);
  lines.forEach((line) => {
    line.split('').forEach((char, i) => {
      if (char === '0') zeroes[i] = (zeroes[i] ?? 0) + 1;
    });
  });

  let gamma = '';
  let epsilon = '';
  for (const count of Object.values(zeroes)) {
    if (count > lines.length / 2) {
      gamma += '0';
      epsilon += '1';
    } else {
      gamma += '1';
      epsilon += '0';
    }
  }

  return { gamma, epsilon };
};

// 4474944
const puzzle2 = (lines) => {
  let possibles = [...lines];
  for (let i = 0; i < lines[0].length; i++) {
    const { gamma } = puzzle1(possibles);
    possibles = possibles.filter((possible) => possible[i] === gamma[i]);
    if (possibles.length === 1) break;
  }
  let oxygenRating = parseInt(possibles[0], 2);

  possibles = [...lines];
  for (let i = 0; i < lines[0].length; i++) {
    const { epsilon } = puzzle1(possibles);
    possibles = possibles.filter((possible) => possible[i] === epsilon[i]);
    if (possibles.length === 1) break;
  }
  let CO2Rating = parseInt(possibles[0], 2);

  return oxygenRating * CO2Rating;
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n');
const { gamma, epsilon } = puzzle1(lines);
console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
console.log(puzzle2(lines));
