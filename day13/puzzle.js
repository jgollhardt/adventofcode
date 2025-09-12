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
    let departure = bus;
    while (departure < earliest) departure += bus;
    return { bus, departure };
  });

  const minBus = _.minBy(starting, 'departure');
  return (minBus.departure - earliest) * minBus.bus;
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

  let period = 1;
  return _.reduce(
    buses,
    (offset, { bus, index }) => {
      while ((offset + index) % bus) {
        offset += period;
      }
      period *= bus;
      return offset;
    },
    0
  );
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
