import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

// 2406
const puzzle1 = (lines) => {
  let [earliest, buses] = lines;
  earliest = parseInt(earliest);
  buses = buses
    .split(',')
    .filter((bus) => bus !== 'x')
    .map((bus) => parseInt(bus));

  let starting = buses.map((bus) => {
    let tmp = bus;
    while (tmp < earliest) tmp += bus;
    return { bus, tmp };
  });

  const min = _.minBy(starting, 'tmp');

  return (min.tmp - earliest) * min.bus;
};

// 225850756401039
const puzzle2 = (lines) => {
  let [, buses] = lines;
  buses = _.transform(buses.split(','), (result, bus, index) => {
    if (bus !== 'x') {
      result.push({
        bus: parseInt(bus),
        index,
      });
    }
  });

  let alephBus = buses[0];
  for (let i = 1; i < buses.length; i++) {
    const { bus, index } = buses[i];
    let x = alephBus.index;
    let newBus;
    while (!newBus) {
      if ((x + index) % bus === 0) {
        newBus = { bus: alephBus.bus * bus, index: x };
        break;
      }
      x += alephBus.bus;
    }

    alephBus = newBus;
  }

  return alephBus.index;
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
