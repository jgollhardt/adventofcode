import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 268
const puzzle1 = (lines) => {
  const possibleChildren = {};
  _.forEach(lines, (children, parent) => {
    const checkBags = [...children];
    const allChildren = new Set();
    while (checkBags.length > 0) {
      const { bag } = checkBags.pop();
      allChildren.add(bag);
      checkBags.push(...lines[bag]);
    }
    possibleChildren[parent] = allChildren;
  });

  return _(possibleChildren)
    .filter((children) => children.has('shiny gold'))
    .size();
};

// 7867
const puzzle2 = (lines) => {
  let result = 0;
  const checkBags = [{ bag: 'shiny gold', qty: 1 }];
  while (checkBags.length > 0) {
    const { bag, qty } = checkBags.pop();
    const children = lines[bag];
    result += qty * _.sumBy(children, 'qty');
    const newBags = children.map((child) => {
      return { ...child, qty: qty * child.qty };
    });
    checkBags.push(...newBags);
  }

  return result;
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data
  .trim()
  .split('\n')
  .reduce((acc, line) => {
    let [parent, children] = line.split(' bags contain ');
    if (line.includes('no other bags.')) children = [];
    else {
      children = children.split(', ').map((child) => {
        const parts = child.split(' ');
        return { bag: `${parts[1]} ${parts[2]}`, qty: parseInt(parts[0]) };
      });
    }
    return { ...acc, [parent]: children };
  }, {});
console.log(puzzle1(lines));
console.log(puzzle2(lines));
