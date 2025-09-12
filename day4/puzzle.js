import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

// 206
const puzzle1 = (lines) => {
  const reqFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  let count = 0;
  lines.forEach((line) => {
    if (reqFields.every((field) => line[field])) count++;
  });

  return count;
};

// 123
const puzzle2 = (lines) => {
  let count = 0;
  lines.forEach((line) => {
    const { byr, iyr, eyr, hgt, hcl, ecl, pid } = line;

    if (!(byr >= 1920 && byr <= 2002)) return;
    if (!(iyr >= 2010 && iyr <= 2020)) return;
    if (!(eyr >= 2020 && eyr <= 2030)) return;

    if (!hgt) return;
    if (hgt.endsWith('cm')) {
      const hgtCM = hgt.slice(0, -2);
      if (!(hgtCM >= 150 && hgtCM <= 193)) return;
    } else if (hgt.endsWith('in')) {
      const hgtIN = hgt.slice(0, -2);
      if (!(hgtIN >= 59 && hgtIN <= 76)) return;
    } else {
      return;
    }

    if (!hcl) return;
    if (!/^#[0-9a-f]{6}$/.test(hcl)) return;

    if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl))
      return;

    if (!pid) return;
    if (!/^[0-9]{9}$/.test(pid)) return;

    count++;
  });

  return count;
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');

const lines = data
  .trim()
  .split('\n\n')
  .map((line) => {
    const passport = {};
    line
      .replace(/[\n]/g, ' ')
      .split(' ')
      .forEach((part) => {
        const [field, val] = part.split(':');
        passport[field] = val;
      });
    return passport;
  });
console.log(puzzle1(lines));
console.log(puzzle2(lines));
