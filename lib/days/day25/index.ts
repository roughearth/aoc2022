import { input } from './input';
import { cleanAndParse } from '../../utils';
import { Day } from '..';

export const meta: Day['meta'] = {};

export function part1() {
  const data = cleanAndParse(input, Number);

  return data.length;
}

export function part2() {
  return "Merry Xmas!";
}
