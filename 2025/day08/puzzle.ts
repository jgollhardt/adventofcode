import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

function buildCircuits(input: Input, n?: number) {
  let dists: [number[], number[], number][] = [];
  for (let i = 0; i < input.length; i++) {
    const [x1, y1, z1] = input[i];
    for (let j = i + 1; j < input.length; j++) {
      const [x2, y2, z2] = input[j];

      const dist = Math.sqrt(
        Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2)
      );

      dists.push([input[i], input[j], dist]);
    }
  }

  dists.sort((a, b) => a[2] - b[2]);

  const circuits: number[][][] = [];
  let seen = new Map<string, number>();
  for (let i = 0; i < (n ?? dists.length); i++) {
    const [pos, pos2] = dists[i];

    const c1 = seen.get(pos.toString());
    const c2 = seen.get(pos2.toString());

    if (c1 !== undefined && c2 !== undefined) {
      if (c1 !== c2) {
        // Assign all of c2 to c1
        for (const posC of circuits[c2]) {
          seen.set(posC.toString(), c1);
        }

        circuits[c1] = [...circuits[c1], ...circuits[c2]];
        circuits[c2] = [];
      }
    } else if (c1 !== undefined) {
      // Assign pos2 to pos circuit
      seen.set(pos2.toString(), c1);
      circuits[c1] = [...circuits[c1], pos2];
    } else if (c2 !== undefined) {
      // Assign pos to pos2 circuit
      seen.set(pos.toString(), c2);
      circuits[c2] = [...circuits[c2], pos];
    } else {
      // create new circuit
      seen.set(pos.toString(), circuits.length);
      seen.set(pos2.toString(), circuits.length);
      circuits.push([pos, pos2]);
    }

    if (
      seen.size === input.length &&
      circuits.filter((c) => c.length > 0).length === 1
    ) {
      return pos[0] * pos2[0];
    }
  }

  return circuits;
}

// 123930
const puzzle1 = (input: Input, n = 1000) => {
  const circuits = buildCircuits(input, n);
  if (typeof circuits === 'number') return;
  let results = circuits.filter((c) => c.length > 0);
  results.sort((a, b) => b.length - a.length);

  let result = 1;
  for (let i = 0; i < 3; i++) {
    result *= results[i].length;
  }

  return result;
};

// 27338688
const puzzle2 = (input: Input) => {
  return buildCircuits(input);
};

await fetchInput();

// const data = fs.readFileSync('test_input.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const rawData = data.replace(/\n$/, '').split('\n');
const input = rawData.map((line) => line.split(',').map((pos) => +pos));
type Input = typeof input;

console.log(puzzle1(input));
console.log(puzzle2(input));
