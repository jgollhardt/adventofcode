import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';
import combinations from 'combinations';
import { init, type Arith } from 'z3-solver';
const { Context } = await init();
const { Optimize, Int } = Context('main');

function minButtonPresses({ ind, buttons }: Input[number]) {
  for (const comb of combinations(buttons)) {
    let result = new Array(ind.length).fill(0);
    for (const button of comb) {
      for (const pos of button) {
        result[pos] ^= 1;
      }
    }

    if (result.toString() === ind.toString()) {
      return comb.length;
    }
  }

  throw new Error('Failed to find min button presses.');
}

async function minJoltagePresses({ buttons, joltage }: Input[number]) {
  const solver = new Optimize();
  const constraints = new Array(joltage.length).fill(Int.val(0));
  let sum: Arith = Int.val(0);

  buttons.map((button, i) => {
    const c = Int.const(i.toString());
    sum = sum.add(c);
    solver.add(c.ge(0));

    button.map((j) => {
      constraints[j] = constraints[j].add(c);
    });
  });

  joltage.map((jolts, i) => {
    constraints[i] = constraints[i].eq(jolts);
  });

  solver.add(...constraints);
  solver.minimize(sum);
  await solver.check();

  return +solver.model().eval(sum).toString();
}

// 399
const puzzle1 = (input: Input) => {
  let result = 0;
  for (const line of input) {
    result += minButtonPresses(line);
  }

  return result;
};

// 15631
const puzzle2 = async (input: Input) => {
  let result = 0;
  for (const line of input) {
    result += await minJoltagePresses(line);
  }

  return result;
};

await fetchInput();

// const data = fs.readFileSync('test_input.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');

const rawData = data.replace(/\n$/, '').split('\n');
const input = rawData.map((line) => {
  const parts = line.split(' ');
  const ind = parts
    .shift()
    ?.slice(1, -1)
    .split('')
    .map((char) => (char === '#' ? 1 : 0))!;
  const joltage = parts
    .pop()
    ?.slice(1, -1)
    .split(',')
    .map((n) => +n)!;

  const buttons = parts.map((button) => {
    return button
      .slice(1, -1)
      .split(',')
      .map((n) => +n);
  });

  return { ind, buttons, joltage };
});

type Input = typeof input;

console.log(puzzle1(input));
console.log(await puzzle2(input));
