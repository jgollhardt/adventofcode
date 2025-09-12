import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../utils/fetch.js';

const puzzle1 = (lines) => {
  let [rules, ticket, nearbys] = lines;
  rules = _.transform(
    rules.split('\n'),
    (result, rule) => {
      // console.log(rule);
      const [name, values] = rule.split(': ');
      let [range1, range2] = values.split(' or ');
      range1 = range1.split('-').map((r) => parseInt(r));
      range2 = range2.split('-').map((r) => parseInt(r));

      result[name] = [range1, range2];
    },
    {}
  );

  nearbys = nearbys
    .split('\n')
    .map((line) => line.split(',').map((field) => parseInt(field)));

  let result = 0;
  nearbys.forEach((nearby) => {
    let invalids = _.filter(nearby, (field) => {
      return !Object.values(rules).some(([rule1, rule2]) => {
        return (
          (rule1[0] <= field && field <= rule1[1]) ||
          (rule2[0] <= field && field <= rule2[1])
        );
      });
    });
    // console.log(invalids);
    result += _.sumBy(invalids) || 0;
  });

  return result;
};

const puzzle2 = (lines) => {
  let [rules, ticket, nearbys] = lines;
  rules = _.transform(
    rules.split('\n'),
    (result, rule) => {
      // console.log(rule);
      const [name, values] = rule.split(': ');
      let [range1, range2] = values.split(' or ');
      range1 = range1.split('-').map((r) => parseInt(r));
      range2 = range2.split('-').map((r) => parseInt(r));

      result[name] = [range1, range2];
    },
    {}
  );

  ticket = ticket
    .split('\n')[1]
    .split(',')
    .map((field) => parseInt(field));

  nearbys = nearbys
    .split('\n')
    .map((line) => line.split(',').map((field) => parseInt(field)));

  // let result = 0;
  nearbys = _.reject(nearbys, (nearby) => {
    let invalids = _.filter(nearby, (field) => {
      return !Object.values(rules).some(([rule1, rule2]) => {
        return (
          (rule1[0] <= field && field <= rule1[1]) ||
          (rule2[0] <= field && field <= rule2[1])
        );
      });
    });
    return invalids.length;
    // console.log(invalids);
    // result += _.sumBy(invalids) || 0;
  });

  nearbys.push(ticket);
  // console.log(nearbys);

  // find fields that only work for one rule
  // that or check each rule for every ticket matching
  let ruleOrders = {};
  while (Object.keys(ruleOrders).length < Object.keys(rules).length) {
    _.forEach(rules, ([rule1, rule2], key) => {
      const valids = _.range(0, nearbys[0].length).filter((idx) => {
        if (Object.values(ruleOrders).includes(idx)) return false;
        return nearbys.every((nearby) => {
          let field = nearby[idx];
          return (
            (rule1[0] <= field && field <= rule1[1]) ||
            (rule2[0] <= field && field <= rule2[1])
          );
        });
      });

      if (valids.length === 1) {
        ruleOrders[key] = valids[0];
      }
    });
  }

  // Find 6 departure fields on my ticket and multiply them
  let result = 1;
  _.forEach(ruleOrders, (idx, rule) => {
    if (rule.startsWith('departure')) {
      result *= ticket[idx];
    }
  });

  return result;
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
