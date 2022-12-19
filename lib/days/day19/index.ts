import { eg1, input } from './input';
import { cleanAndParse, SafetyNet, sumOf } from '../../utils';
import { Day } from '..';

export const meta: Day['meta'] = {
  manualStart: true,
  maxMs: 1200_000,
  maxLoops: 1e12
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

function max(id: number, safetyNet: SafetyNet) {
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
      return max;
    }
  }
}
type Max = ReturnType<typeof max>;

function findBest(
  safetyNet: SafetyNet,
  max: Max,
  blueprint: Blueprint,
  oreRobots: number,
  clayRobots: number,
  obsidianRobots: number,
  geodeRobots: number,
  ore: number,
  clay: number,
  obsidian: number,
  geodes: number,
  minutesGone: number
): number {
  __log(
    `#${blueprint.id} @ ${minutesGone}`
  );
  __log(
    "Robots",
    oreRobots,
    clayRobots,
    obsidianRobots,
    geodeRobots
  );
  __log(
    "Mined ",
    ore,
    clay,
    obsidian,
    geodes
  );

  safetyNet.isSafe();

  const {
    oreOre,
    clayOre,
    obsidianOre,
    obsidianClay,
    geodeOre,
    geodeObsidian
  } = blueprint;

  const timeLimit = 24;

  // if (obsidianClay + geodeObsidian > timeLimit) {
  //   return 0;
  // }

  if (minutesGone === 24) {
    max.set(geodes);
    return geodes;
  }

  const minuteLeft = timeLimit - minutesGone;

  const upperBound = geodes + geodeRobots * minuteLeft + (minuteLeft * (minuteLeft + 1) * 0.5);

  if (upperBound < max.value()) {
    return -1;
  }

  minutesGone++;

  const results: number[] = [];

  const canMakeGeodeRobot = (ore >= geodeOre) && (obsidian >= geodeObsidian);
  const canMakeObsidianRobot = (obsidianRobots < geodeObsidian) && (ore >= obsidianOre) && (clay >= obsidianClay);
  const canMakeClayRobot = (clayRobots < obsidianClay) && (ore >= clayOre);
  const canMakeOreRobot = (oreRobots <= Math.max(oreOre, clayOre, obsidianOre, geodeOre)) && (ore >= oreOre);

  let makeGeodeRobot = false;
  let makeObsidianRobot = false;
  let makeClayRobot = false;
  let makeOreRobot = false;

  if (false) { }
  else if (canMakeGeodeRobot) {
    makeGeodeRobot = true;
  }
  else if (canMakeObsidianRobot) {
    makeObsidianRobot = true;
  }
  else {
    if (canMakeClayRobot) {
      makeClayRobot = true;
    }
    if (canMakeOreRobot) {
      makeOreRobot = true;
    }
  }


  ore += oreRobots;
  clay += clayRobots;
  obsidian += obsidianRobots;
  geodes += geodeRobots;

  if (makeGeodeRobot) {
    __log("make a geode robot");
    results.push(findBest(
      safetyNet,
      max,
      blueprint,
      oreRobots,
      clayRobots,
      obsidianRobots,
      geodeRobots + 1,
      ore - geodeOre,
      clay,
      obsidian - geodeObsidian,
      geodes,
      minutesGone
    ));
  }
  if (makeObsidianRobot) {
    __log("make an obsidian robot");
    results.push(findBest(
      safetyNet,
      max,
      blueprint,
      oreRobots,
      clayRobots,
      obsidianRobots + 1,
      geodeRobots,
      ore - obsidianOre,
      clay - obsidianClay,
      obsidian,
      geodes,
      minutesGone
    ));
  }

  if (makeClayRobot) {
    __log("make a clay robot");
    results.push(findBest(
      safetyNet,
      max,
      blueprint,
      oreRobots,
      clayRobots + 1,
      obsidianRobots,
      geodeRobots,
      ore - clayOre,
      clay,
      obsidian,
      geodes,
      minutesGone
    ));
  }

  if (makeOreRobot) {
    __log("make an ore robot");
    results.push(findBest(
      safetyNet,
      max,
      blueprint,
      oreRobots + 1,
      clayRobots,
      obsidianRobots,
      geodeRobots,
      ore - oreOre,
      clay,
      obsidian,
      geodes,
      minutesGone
    ));
  }

  // if (results.length > 1) {
  //   throw new Error(`too many robots made ${[makeGeodeRobot, makeObsidianRobot, makeClayRobot, makeOreRobot].join()}`)
  // }

  results.push(findBest(
    safetyNet,
    max,
    blueprint,
    oreRobots,
    clayRobots,
    obsidianRobots,
    geodeRobots,
    ore,
    clay,
    obsidian,
    geodes,
    minutesGone
  ));

  // console.log(results);
  return Math.max(...results);
}

export function part1(safetyNet: SafetyNet) {
  const blueprints = cleanAndParse(eg1, parseBlueprint);

  const map = blueprints.map(blueprint => [blueprint.id, findBest(safetyNet, max(blueprint.id, safetyNet), blueprint, 1, 0, 0, 0, 0, 0, 0, 0, 0)])

  console.log(map);

  // 181 too low

  return sumOf(map.map(([i, v]) => i * v));
}

export function part2() {
  const data = cleanAndParse(input, Number);

  return data.length;
}
