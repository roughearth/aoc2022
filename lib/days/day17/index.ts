import { eg1, input } from './input';
import { cleanAndParse, SafetyNet } from '../../utils';
import { Day } from '..';

export const meta: Day['meta'] = {
  maxLoops: 1e7
};

type Edge = number[];
type Cells = number[][];
type Rock = {
  left: Edge,
  right: Edge,
  bottom: Edge,
  cells: (x: number, y: number) => Cells
}
type Stack = Map<number, Set<number>>;

// x -> y is left -> up
const ROCKS: Rock[] = [
  // ####
  {
    left: [0],
    right: [3],
    bottom: [0, 1, 2, 3],
    cells: (x: number, y: number) => [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0]
    ].map(([X, Y]) => [X + x, Y + y])
  },

  // .#.
  // ###
  // .#.
  {
    left: [0, 1, 4],
    right: [0, 3, 4],
    bottom: [0, 1, 3],
    cells: (x: number, y: number) => [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [1, 2]
    ].map(([X, Y]) => [X + x, Y + y])
  },

  // ..#
  // ..#
  // ###
  {
    left: [0],
    right: [2, 3, 4],
    bottom: [0, 1, 2],
    cells: (x: number, y: number) => [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2]
    ].map(([X, Y]) => [X + x, Y + y])
  },

  // #
  // #
  // #
  // #
  {
    left: [0, 1, 2, 3],
    right: [0, 1, 2, 3],
    bottom: [0],
    cells: (x: number, y: number) => [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3]
    ].map(([X, Y]) => [X + x, Y + y])
  },

  // ##
  // ##
  {
    left: [0, 2],
    right: [1, 3],
    bottom: [0, 1],
    cells: (x: number, y: number) => [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1]
    ].map(([X, Y]) => [X + x, Y + y])
  }
];

const LEFT_WALL = 0;
const RIGHT_WALL = 6;
const FLOOR = 0;

type Wind = ['left' | 'right', 1 | -1]
function parseWind(src: string): Wind[] {
  return Array.from(src).map(
    i => <Wind>({
      '<': ['left', -1],
      '>': ['right', 1],
    }[i])
  );
}

function canMove(rock: Cells, stack: Stack) {
  for (const [x, y] of rock) {
    if (x < LEFT_WALL || x > RIGHT_WALL || y < FLOOR) {
      return false;
    }
    if (stack.get(y)?.has(x)) {
      return false;
    }
  }
  return true;
}

function visualise(stack: Stack, cells?: Cells) {
  const rows = [Array.from("+-------+")];
  let height = Math.max(0, ...Array.from(stack.keys()));

  if (cells) {
    const ys = cells.map(([, y]) => y);
    height = Math.max(height, ...ys);
  }

  for (let y = 0; y <= height; y++) {
    const row = ['|'];
    for (let x = 0; x < 7; x++) {
      if (stack.get(y)?.has(x)) {
        row.push("#");
      }
      else {
        row.push(".");
      }
    }
    row.push("|");
    rows.push(row);
  }

  if (cells) {
    for (const [x, y] of cells) {
      rows[y + 1][x + 1] = "@";
    }
  }

  return rows.reverse().map(r => r.join("")).join("\n");
}

export function part1(safetyNet: SafetyNet) {
  const wind = parseWind(input);
  const windSize = wind.length;

  let nextWind = 0;
  let nextRock = 0;

  let Rocks = 2022;

  // Use this as Y, X to make tracking height easier
  let stack: Stack = new Map();

  while (Rocks--) {
    const thisRock = ROCKS[nextRock];

    let height = Math.max(-1, ...Array.from(stack.keys())) + 1;
    let nextX = 2;
    let nextY = height + 3;

    move:
    while (safetyNet.isSafe()) {
      // move (and increment) wind if poss
      const [wDir, wInc] = wind[nextWind];
      nextWind = (nextWind + 1) % windSize;
      const wRock = thisRock.cells(nextX + wInc, nextY);

      if (canMove(wRock, stack)) {
        nextX += wInc;
      }

      const dRock = thisRock.cells(nextX, nextY - 1);

      if (canMove(dRock, stack)) {
        nextY--;
      }
      else {
        // add to stack...
        const sRock = thisRock.cells(nextX, nextY);
        for (const [x, y] of sRock) {
          if (!stack.has(y)) {
            stack.set(y, new Set<number>());
          }
          stack.get(y)!.add(x);
        }

        // ..and break inner loop
        break move;
      }
    }

    nextRock = (nextRock + 1) % 5;
  }

  return Math.max(0, ...Array.from(stack.keys())) + 1;
}

export function part2() {
  const wind = Array.from(input);

  return -999;
}
