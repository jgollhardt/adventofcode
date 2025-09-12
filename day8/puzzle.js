import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

const parseInstructions = (data) => {
  return data
    .trim()
    .split('\n')
    .map((line) => {
      const [op, num] = line.split(' ');
      return {
        op,
        num: parseInt(num),
      };
    });
};

const runProgram = (program) => {
  let acc = 0;
  let lineNumber = 0;
  const seen = new Set();
  while (!seen.has(lineNumber) && lineNumber < program.length) {
    let { op, num } = program[lineNumber];
    seen.add(lineNumber);

    switch (op) {
      case 'acc':
        lineNumber += 1;
        acc += num;
        break;
      case 'jmp':
        lineNumber += num;
        break;
      case 'nop':
        lineNumber += 1;
        break;
    }
  }

  return { acc, finite: lineNumber >= program.length };
};

// 1801
const puzzle1 = (program) => {
  return runProgram(program).acc;
};

// 2060
const puzzle2 = (program) => {
  const modifiedPrograms = _.transform(
    program,
    (result, { op, num }, index) => {
      if (op === 'acc') return;
      const newProgram = [...program];
      newProgram[index] = { op: op === 'nop' ? 'jmp' : 'nop', num };
      result.push(newProgram);
    }
  );

  return _(modifiedPrograms).map(runProgram).filter('finite').first().acc;
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const program = parseInstructions(data);
console.log(puzzle1(program));
console.log(puzzle2(program));
