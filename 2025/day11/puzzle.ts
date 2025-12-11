import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

function getNumPaths(
  graph: Map<string, string[]>,
  seen: Map<string, number>,
  node: string,
  end: string
): number {
  if (node === end) return 1;

  const numPaths = seen.get(node);
  if (numPaths !== undefined) return numPaths;

  const numNextPaths = (graph.get(node) ?? []).reduce((acc, next) => {
    return acc + getNumPaths(graph, seen, next, end);
  }, 0);

  seen.set(node, numNextPaths);

  return numNextPaths;
}

// 668
const puzzle1 = (graph: Map<string, string[]>) => {
  return getNumPaths(graph, new Map(), 'you', 'out');
};

// 294310962265680
const puzzle2 = (graph: Map<string, string[]>) => {
  // I noticed the graph doesn't have any loops, and that there's no path from dac to fft
  return (
    getNumPaths(graph, new Map(), 'svr', 'fft') *
    getNumPaths(graph, new Map(), 'fft', 'dac') *
    getNumPaths(graph, new Map(), 'dac', 'out')
  );
};

await fetchInput();

// const data = fs.readFileSync('test_input.txt', 'utf-8');
// const data = fs.readFileSync('test_input2.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');

const rawData = data.replace(/\n$/, '').split('\n');
const input = rawData.map((line) => line.replace(':', '').split(' '));
let graph = new Map();
for (const line of input) {
  const [input, ...output] = line;
  graph.set(input, output);
}

console.log(puzzle1(graph));
console.log(puzzle2(graph));
