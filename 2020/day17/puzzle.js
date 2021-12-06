import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

const printGrid = (actives, cycle = 0) => {
  actives = _.keys(actives).map((key) =>
    key.split(',').map((i) => parseInt(i))
  );
  const [minX] = _.minBy(actives, (a) => a[0]);
  const [, minY] = _.minBy(actives, (a) => a[1]);
  const [, , minZ] = _.minBy(actives, (a) => a[2]);
  const [maxX] = _.maxBy(actives, (a) => a[0]);
  const [, maxY] = _.maxBy(actives, (a) => a[1]);
  const [, , maxZ] = _.maxBy(actives, (a) => a[2]);

  console.log(`\nAfter ${cycle} cycles:\n`);
  for (let z = minZ; z <= maxZ; z++) {
    console.log(`z=${z}`);
    for (let y = minY; y <= maxY; y++) {
      let s = '';

      for (let x = minX; x <= maxX; x++) {
        const pos = [x, y, z];
        if (
          _.some(actives, (active) => {
            return _.isEqual(active, pos);
          })
        ) {
          s += '#';
        } else s += '.';
      }
      console.log(s);
    }
    console.log();
  }
};

// 317
const puzzle1 = (lines) => {
  let actives = {};
  lines.forEach((row, y) => {
    row.split('').forEach((cube, x) => {
      if (cube === '#') actives[[x, y, 0]] = true;
    });
  });
  // printGrid(actives);

  // 6 cycles
  _.range(1, 7).forEach((i) => {
    const newActives = {};
    _.range(0 - i, lines.length + i).forEach((x) => {
      _.range(0 - i, lines.length + i).forEach((y) => {
        _.range(0 - i, 1 + i).forEach((z) => {
          const dirs = [-1, 0, 1];
          let count = 0;
          dirs.forEach((dx) => {
            dirs.forEach((dy) => {
              dirs.forEach((dz) => {
                if (dx === 0 && dy === 0 && dz === 0) return;
                const pos = [x + dx, y + dy, z + dz];
                if (actives[pos]) count += 1;
              });
            });
          });

          const pos = [x, y, z];
          const active = actives[pos];
          if (count === 3 || (active && count == 2)) newActives[pos] = true;
        });
      });
    });

    actives = newActives;
    // printGrid(actives, i);
  });

  return _.size(actives);
};

// 1692
const puzzle2 = (lines) => {
  let actives = {};
  lines.forEach((row, y) => {
    row.split('').forEach((cube, x) => {
      if (cube === '#') actives[[x, y, 0, 0]] = true;
    });
  });

  // 6 cycles
  _.range(1, 7).forEach((i) => {
    const newActives = {};
    _.range(0 - i, lines.length + i).forEach((x) => {
      _.range(0 - i, lines.length + i).forEach((y) => {
        _.range(0 - i, 1 + i).forEach((z) => {
          _.range(0 - i, 1 + i).forEach((w) => {
            const dirs = [-1, 0, 1];
            let count = 0;
            dirs.forEach((dx) => {
              dirs.forEach((dy) => {
                dirs.forEach((dz) => {
                  dirs.forEach((dw) => {
                    if (dx === 0 && dy === 0 && dz === 0 && dw === 0) return;
                    const pos = [x + dx, y + dy, z + dz, w + dw];
                    if (actives[pos]) count += 1;
                  });
                });
              });
            });

            const pos = [x, y, z, w];
            const active = actives[pos];
            if (count === 3 || (active && count == 2)) newActives[pos] = true;
          });
        });
      });
    });

    actives = newActives;
  });

  return _.size(actives);
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
