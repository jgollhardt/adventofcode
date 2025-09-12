import _ from 'lodash';
import fs from 'fs';
import { fetchInput } from '../../utils/fetch.js';

// 111936085519519
const puzzle1 = (lines) => {
  const tiles = {};

  lines.forEach((tile) => {
    const [id, ...rest] = tile.split('\n');
    tiles[id.slice(-5, -1)] = rest;
  });

  const adjs = {};
  _.forEach(tiles, (tile, id) => {
    // grab each edge and their reverse, compare it to top line of each other tile
    let edges = [
      _.first(tile),
      _.last(tile),
      tile.map((tile) => _.first(tile)).join(''),
      tile.map((tile) => _.last(tile)).join(''),
    ];
    let allEdges = [...edges];
    edges.forEach((edge) => {
      allEdges.push([...edge].reverse().join(''));
    });

    let count = 0;
    _.forEach(tiles, (tile2, id2) => {
      if (id2 === id) return;

      let edges2 = [
        _.first(tile2),
        _.last(tile2),
        tile2.map((tile2) => _.first(tile2)).join(''),
        tile2.map((tile2) => _.last(tile2)).join(''),
      ];

      if (_.intersection(allEdges, edges2).length > 0) {
        count += 1;
        // console.log(_.first(tile2), allEdges);
      }
    });
    adjs[id] = count;

    // console.log(allEdges);
  });

  // console.log(adjs);

  let result = 1;
  _.forEach(adjs, (val, id) => {
    if (val === 2) result *= parseInt(id);
  });

  return result;
};

const getEdges = (tile) => {
  let edges = [
    _.first(tile),
    _.last(tile),
    tile.map((tile) => _.first(tile)).join(''),
    tile.map((tile) => _.last(tile)).join(''),
  ];
  let allEdges = [...edges];
  edges.forEach((edge) => {
    allEdges.push([...edge].reverse().join(''));
  });

  return allEdges;
};

const rotateTile = (tile) => {
  let newTile = [];

  for (let i = 0; i < tile.length; i++) {
    let newRow = tile.map((row) => row[i]);
    newRow = [...newRow].reverse().join('');
    newTile.push(newRow);
  }

  return newTile;
};

const flipTile = (tile) => {
  return tile.map((row) => [...row].reverse().join(''));
};

const permuteTile = (tile) => {
  const rotations = [tile];
  let tmpTile = [...tile];
  _.range(3).forEach((i) => {
    tmpTile = rotateTile(tmpTile);
    rotations.push(tmpTile);
  });
  const flips = rotations.map(flipTile);
  return [...rotations, ...flips];
};

// 1792
const puzzle2 = (lines) => {
  const tiles = {};

  lines.forEach((tile) => {
    const [id, ...rest] = tile.split('\n');
    tiles[id.slice(-5, -1)] = rest;
  });

  const adjs = {};
  _.forEach(tiles, (tile, id) => {
    // grab each edge and their reverse, compare it to top line of each other tile
    let edges = [
      _.first(tile),
      _.last(tile),
      tile.map((tile) => _.first(tile)).join(''),
      tile.map((tile) => _.last(tile)).join(''),
    ];
    let allEdges = [...edges];
    edges.forEach((edge) => {
      allEdges.push([...edge].reverse().join(''));
    });

    let adj = [];
    _.forEach(tiles, (tile2, id2) => {
      if (id2 === id) return;

      let edges2 = [
        _.first(tile2),
        _.last(tile2),
        tile2.map((tile2) => _.first(tile2)).join(''),
        tile2.map((tile2) => _.last(tile2)).join(''),
      ];

      if (_.intersection(allEdges, edges2).length > 0) {
        // save the edge that matched
        const [matched] = _.intersection(allEdges, edges2);
        adj.push({ id: id2, edge: matched });
      }
    });
    adjs[id] = adj;

    // console.log(allEdges);
  });

  // Patch the image together
  // Start with a corner? We know it's orientation

  // console.log(adjs);

  let twos = [];
  let threes = [];
  let fours = [];
  _.forEach(adjs, (val, id) => {
    // console.log(val);
    if (val.length === 2) twos.push(id);
    if (val.length === 3) threes.push(id);
    if (val.length === 4) fours.push(id);
  });
  // console.log(twos);

  // For each rotaion of the first corner piece, check that it fits
  let corner = twos.pop();

  const expectedEdges = _.map(adjs[corner], 'edge');
  expectedEdges.push(
    ..._.map(adjs[corner], 'edge').map((e) => [...e].reverse().join(''))
  );

  let cornerTile = tiles[corner];
  // const [, bottom, , right] = getEdges(cornerTile);

  // console.log(cornerTile.join('\n'));
  // console.log();
  // console.log(rotateTile(cornerTile).join('\n'));
  // console.log(flipTile(cornerTile).join('\n'));

  const RF = permuteTile(cornerTile);
  // console.log(permuteTile(cornerTile));
  // console.log(RF.map((tile) => tile.join('\n')).join('\n\n'));

  // returns 2 orientations, just pick one
  const [rotation] = _.filter(RF, (tile) => {
    const [, bottom, , right] = getEdges(tile);
    // console.log(bottom, right, expectedEdges);

    if (_.intersection([bottom, right], expectedEdges).length === 2)
      return true;
  });

  // looking for 2 to 4 adjacents
  // can calculate the numbers we're looking for based on the number of tiles
  // (sqrt(size) - 1) ** 2 need 4
  // 4 need two
  // 4 * sqrt(size) - 8 need 3
  const edgeLength = Math.sqrt(_.size(tiles));
  // const numTwos = 4;
  // const numThrees = 4 * Math.sqrt(_.size(tiles)) - 8;
  // const numFours = Math.round(Math.pow(Math.sqrt(_.size(tiles) - 1), 2));
  // console.log(edgeLength, numTwos, numThrees, numFours);
  const image = new Array(edgeLength);
  _.range(edgeLength).forEach((i) => {
    image[i] = new Array(edgeLength);
  });
  let queue = [[[...rotation], corner, [0, 0]]];
  // console.log(image);

  // starting with top corner, rotate adjacents and put them in the image
  while (queue.length > 0) {
    // console.log(queue.length);
    const [tile, id, [row, col]] = queue.pop();
    if (image[row][col]) continue;
    image[row][col] = tile;

    // rotate and push adjacents
    const [, bottom, , right] = getEdges(tile);

    const adjIds = _.map(adjs[id], 'id');
    adjIds.forEach((id) => {
      const variants = permuteTile(tiles[id]);
      variants.forEach((variant) => {
        const [top, , left] = getEdges(variant);
        // console.log(variant, top, bottom, left, right);

        if (top === bottom) {
          queue.push([variant, id, [row + 1, col]]);
        }

        if (left === right) {
          queue.push([variant, id, [row, col + 1]]);
        }
      });
    });
    // console.log(bottom, right, adjs[id]);
  }

  // console.log(image);
  const stichedImage = image
    .map((row) => {
      // remove borders
      const borderless = row.map((tile) => {
        return tile.slice(1, -1).map((line) => line.slice(1, -1));
      });

      return _.range(borderless[0].length)
        .map((i) => borderless.map((tile) => tile[i]).join(''))
        .join('\n');
    })
    .join('\n');

  // console.log(stichedImage);
  const images = permuteTile(stichedImage.split('\n'));
  const monster = [
    '                  # ',
    '#    ##    ##    ###',
    ' #  #  #  #  #  #   ',
  ];

  let monsterOffsets = [];
  monster.forEach((line, row) => {
    [...line].forEach((char, col) => {
      if (char === '#') monsterOffsets.push([row, col]);
    });
  });
  // console.log(monsterOffsets);
  let count = 0;
  images.some((image) => {
    // console.log(images);
    count = 0;
    image.forEach((line, row) => {
      [...line].forEach((char, col) => {
        if (
          monsterOffsets.every(([dRow, dCol]) => {
            // console.log(dRow, dCol);
            return image[row + dRow] && image[row + dRow][col + dCol] === '#';
          })
        ) {
          // console.log('test');
          count += 1;
        }
      });
    });
    if (count) return true;
  });

  // stichedImage.forEach((row) => console.log(row.join('\n')));

  return (
    _.countBy(stichedImage)['#'] - count * _.countBy(monster.join(''))['#']
  );
};

await fetchInput();

// const data = fs.readFileSync('test_input1.txt', 'utf-8');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.trim().split('\n\n');
console.log(puzzle1(lines));
console.log(puzzle2(lines));
