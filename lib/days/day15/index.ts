import { eg1, input } from './input';
import { cleanAndParse, cloneRange, CoordinateRange, coordinates, getIntKey } from '../../utils';
import { Day } from '..';

export const meta: Day['meta'] = {
  manualStart: true
};

function getKey(pt: number[]) {
  return getIntKey(pt, 1e7);
}

function distance(a: number[], b: number[]) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function analyse(input: string) {
  const range: CoordinateRange = [
    [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
    [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]
  ];

  const beacons = new Set<number>();

  const sensors = cleanAndParse(input, s => {
    const [sensor, beacon] = s.slice(10)
      .split(': closest beacon is at ')
      .map(c => c.slice(2).split(', y=').map(Number));

    const [bx, by] = beacon;
    const [sx, sy] = sensor;

    const radius = distance(beacon, sensor);
    beacons.add(getKey(beacon));

    range[0][0] = Math.min(range[0][0], bx - radius, sx - radius);
    range[0][1] = Math.max(range[0][1], bx + radius, sx + radius);
    range[1][0] = Math.min(range[1][0], by - radius, sy - radius);
    range[1][1] = Math.max(range[1][1], by + radius, sy + radius);

    return { sensor, beacon, radius };
  });

  return { sensors, beacons, range };
}

export function part1() {
  const { sensors, beacons, range } = analyse(input);

  const rowRange = cloneRange(range);
  rowRange[1] = [2000000, 2000000];
  let found = 0;

  row:
  for (const pt of coordinates(rowRange)) {
    const alreadyBeacon = beacons.has(getKey(pt));
    for (const { sensor, radius } of sensors) {
      const dist = distance(pt, sensor);
      if (!alreadyBeacon && (dist <= radius)) {
        found++;
        continue row;
      }
    }
  }

  return found;
}

export function part2() {
  const { sensors, beacons, range } = analyse(input);

  return sensors.length;
}

export const answers = [
  5112034
];
