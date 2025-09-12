import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

// 11926135976176
const puzzle1 = (lines) => {
  let db = {};
  let mask;
  lines.forEach((line) => {
    if (line.startsWith('mask')) {
      mask = line.split(' = ')[1].split('');
    } else {
      let [mem, val] = line.split(' = ');
      const addr = mem.slice(4, -1);
      val = _.padStart(parseInt(val).toString(2), 36, '0').split('');
      mask.forEach((m, i) => {
        if (m != 'X') {
          val[i] = m;
        }
      });

      db[addr] = parseInt(val.join(''), 2);
    }
  });

  return _.sumBy(Object.values(db));
};

// 4330547254348
const puzzle2 = (lines) => {
  let db = {};
  let mask;
  lines.forEach((line) => {
    if (line.startsWith('mask')) {
      mask = line.split(' = ')[1].split('');
    } else {
      let [mem, val] = line.split(' = ');
      let addr = mem.slice(4, -1);
      addr = _.padStart(parseInt(addr).toString(2), 36, '0').split('');
      val = parseInt(val);
      mask.forEach((m, i) => {
        if (m === '1') {
          addr[i] = m;
        }
      });

      let addrs = [addr];
      mask.forEach((m, i) => {
        if (m === 'X') {
          let newAddrs = [];
          addrs.forEach((addr) => {
            ['0', '1'].forEach((bit) => {
              const newAddr = [...addr];
              newAddr[i] = bit;
              newAddrs.push(newAddr);
            });
          });
          addrs = newAddrs;
        }
      });

      addrs.forEach((addr) => {
        db[addr] = val;
      });
    }
  });

  return _.sumBy(Object.values(db));
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
