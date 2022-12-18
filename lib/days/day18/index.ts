import { eg1, input } from './input';
import { cleanAndParse, Coordinate, CoordinateRange, coordinates, getIntKey, inRange, orthogonalNeighbours } from '../../utils';
import { Day } from '..';

export const meta: Day['meta'] = {};

function toNeighbourEntries(src: string): [string, string[]] {
  const coords = src.split(",").map(Number);

  const neighbourCoords = Array.from(orthogonalNeighbours(coords));

  return [src, neighbourCoords.map(c => c.join(","))];
}


export function part1() {
  const entries = cleanAndParse(input, toNeighbourEntries);

  const neighbourMap = new Map(entries);
  let found = 0;

  for (const [cube, neighbours] of neighbourMap) {
    for (const neighbour of neighbours) {
      if (neighbourMap.has(neighbour)) {
        found++;
      }
    }
  }

  return (neighbourMap.size * 6) - found;
}


export function part2() {
  return -999;
}
