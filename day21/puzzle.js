import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

// 1829
const puzzle1 = (lines) => {
  const ingredients = [];
  const allergens = {};
  lines.forEach((line) => {
    let [ings, alls] = line.split(' (contains ');
    ings = ings.split(' ');
    ings.forEach((ing) => ingredients.push(ing));
    alls = alls.slice(0, -1).split(', ');
    alls.forEach((all) => {
      if (allergens[all]) {
        allergens[all] = _.intersection(allergens[all], ings);
      } else {
        allergens[all] = ings;
      }
    });
  });

  // while len > 1
  _.range(100).forEach(() => {
    _.forEach(allergens, (val, ind) => {
      if (val.length === 1) {
        _.forEach(allergens, (val2, ind2) => {
          if (ind === ind2) return;
          if (val2.includes(val[0])) {
            allergens[ind2] = _.reject(allergens[ind2], (a) => a === val[0]);
          }
        });
      }
    });
  });

  const A = _.values(allergens).map((a) => a[0]);
  return _.reject(ingredients, (ing) => A.includes(ing)).length;
};

// mxkh,gkcqxs,bvh,sp,rgc,krjn,bpbdlmg,tdbcfb
const puzzle2 = (lines) => {
  const ingredients = [];
  const allergens = {};
  lines.forEach((line) => {
    let [ings, alls] = line.split(' (contains ');
    ings = ings.split(' ');
    ings.forEach((ing) => ingredients.push(ing));
    alls = alls.slice(0, -1).split(', ');
    alls.forEach((all) => {
      if (allergens[all]) {
        allergens[all] = _.intersection(allergens[all], ings);
      } else {
        allergens[all] = ings;
      }
    });
  });

  // while len > 1
  _.range(100).forEach(() => {
    _.forEach(allergens, (val, ind) => {
      if (val.length === 1) {
        _.forEach(allergens, (val2, ind2) => {
          if (ind === ind2) return;
          if (val2.includes(val[0])) {
            allergens[ind2] = _.reject(allergens[ind2], (a) => a === val[0]);
          }
        });
      }
    });
  });

  return _(allergens)
    .entries()
    .sortBy()
    .map((val) => val[1][0])
    .join(',');
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
