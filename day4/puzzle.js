import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

// 206
const puzzle1 = (lines) => {
  const reqFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const validPassports = lines.filter((line) => {
    return reqFields.every((field) => line[field]);
  });

  return validPassports.length;
};

// 123
const puzzle2 = (lines) => {
  const reqFields = {
    byr: /^19[2-9][0-9]|200[0-2]$/,
    iyr: /^201[0-9]|2020$/,
    eyr: /^202[0-9]|2030$/,
    hgt: /^1([5-8][0-9]|9[0-3])cm|([5-6][0-9]|7[0-6])in$/,
    hcl: /^#[0-9a-f]{6}$/,
    ecl: /^amb|blu|brn|gry|grn|hzl|oth$/,
    pid: /^[0-9]{9}$/,
  };

  const validPassports = lines.filter((line) => {
    return Object.keys(reqFields).every((field) => {
      return reqFields[field].test(line[field]);
    });
  });

  return validPassports.length;
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
      .replace(/\n/g, ' ')
      .split(' ')
      .forEach((part) => {
        const [field, val] = part.split(':');
        passport[field] = val;
      });
    return passport;
  });
console.log(puzzle1(lines));
console.log(puzzle2(lines));
