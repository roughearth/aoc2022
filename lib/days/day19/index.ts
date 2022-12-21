import { eg1, input } from './input';
import { cleanAndParse, productOf, SafetyNet, sumOf } from '../../utils';
import { Day } from '..';

export const meta: Day['meta'] = {
  manualStart: true,
  maxMs: 8 * 60 * 60 * 1_000,
  logMsInterval: 5_000,
  maxLoops: Infinity
};

function parseBlueprint(src: string, i: number) {
  const numbers = src.match(/([0-9]+)/g)!;

  const [
    id,
    oreOre,
    clayOre,
    obsidianOre,
    obsidianClay,
    geodeOre,
    geodeObsidian
  ] = numbers.map(Number);

  if (id !== i + 1) {
    throw new Error("ID sequence error");
  }

  return {
    id,
    oreOre,
    clayOre,
    obsidianOre,
    obsidianClay,
    geodeOre,
    geodeObsidian
  }
}

type Blueprint = ReturnType<typeof parseBlueprint>;
function __log(...msg: any[]) {
  // console.log(...msg);
}

function newMax(id: number, safetyNet: SafetyNet) {
  console.log("New max for", id, "@", safetyNet.duration);

  let max = 0;

  return {
    set(v: number) {
      if (v > max) {
        max = v;
        console.log("max to", v);
      }
    },
    value() {
      safetyNet.isSafe((_, duration) => `heartbeat @ ${duration}`);
      return max;
    }
  }
}
type Max = ReturnType<typeof max>;

function findBest(
  safetyNet: SafetyNet,
  blueprint: Blueprint,
  minutesLeft: number
): number {
  const max = newMax(blueprint.id, safetyNet);
  // [minutes left, 4 * robot count, 4 * material count]
  const state = [minutesLeft, 1, 0, 0, 0, 0, 0, 0, 0];
}

export function part1(safetyNet: SafetyNet) {
  const blueprints = cleanAndParse(eg1, parseBlueprint);

  const map = blueprints.map(blueprint => [blueprint.id, findBest(safetyNet, blueprint, 24)])

  console.log(map);

  return sumOf(map.map(([i, v]) => i * v));
}

export function part2(safetyNet: SafetyNet) {
  const blueprints = cleanAndParse(input, parseBlueprint).slice(0, 3);

  // const map = blueprints.map(blueprint => findBest(safetyNet, max(blueprint.id, safetyNet), blueprint, 32, 1, 0, 0, 0, 0, 0, 0, 0));

  // console.log(map);

  return "productOf(map)";
}

export const answers = [
  Symbol.for("skip"), // 851 in 11 mins, eg 33 = 1 * 9 + 2 * 12
  Symbol.for("skip") // 12160 in 14 mins, eg 3472 = 56 * 62
];
