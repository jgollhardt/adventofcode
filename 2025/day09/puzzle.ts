import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

function getRectangles(input: Input) {
  let sizes: [number[], number[], number][] = [];
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const size =
        (Math.abs(input[i][0] - input[j][0]) + 1) *
        (Math.abs(input[i][1] - input[j][1]) + 1);

      sizes.push([input[i], input[j], size]);
    }
  }

  sizes.sort((a, b) => b[2] - a[2]);

  return sizes;
}

// 4755064176
const puzzle1 = (input: Input) => {
  const rectangles = getRectangles(input);
  return rectangles[0][2];
};

// 1613305596
const puzzle2 = (input: Input) => {
  const rectangles = getRectangles(input);

  const lines: number[][] = [];
  for (let i = 0; i < input.length; i++) {
    const [x1, y1] = input[i];
    const [x2, y2] = input[i + 1 === input.length ? 0 : i + 1];
    lines.push([x1, y1, x2, y2]);
  }

  for (const [c1, c2, size] of rectangles) {
    // Get the corners of the rectangle
    const minX = Math.min(c1[0], c2[0]);
    const maxX = Math.max(c1[0], c2[0]);
    const minY = Math.min(c1[1], c2[1]);
    const maxY = Math.max(c1[1], c2[1]);

    // Check if any line in our polygon intersects our box (by checking if the line is fully left/right/above/below)
    let intersects = false;
    for (const line of lines) {
      const [ax1, ay1, ax2, ay2] = line;
      if (
        !(
          Math.max(ax1, ax2) <= minX ||
          Math.min(ax1, ax2) >= maxX ||
          Math.max(ay1, ay2) <= minY ||
          Math.min(ay1, ay2) >= maxY
        )
      ) {
        intersects = true;
        break;
      }
    }

    if (!intersects) {
      return size;
    }
  }
};

await fetchInput();

// const data = fs.readFileSync('test_input.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');

const rawData = data.replace(/\n$/, '').split('\n');
const input = rawData.map((line) => line.split(',').map((n) => +n));
type Input = typeof input;

console.log(puzzle1(input));
console.log(puzzle2(input));
