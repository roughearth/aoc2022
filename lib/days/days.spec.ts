import { Days } from '.';
import { generateArray, safetyNet } from '../utils';
import { determineDay } from '../utils/dates';

function dayFilter(d: number) {
  const day = determineDay();

  if (day < 0 || day > 25) {
    return true;
  }

  if (process.env.DAY === "today") {
    return d === day;
  }

  const envDay = Number(process.env.DAY);

  if (envDay >= 1 && envDay <= 25) {
    return d === envDay;
  }

  return true;
}

const dayResults = generateArray(25, i => [i + 1]).filter(([d]) => dayFilter(d));

describe.each(dayResults)("Day %i", (d: number) => {
  const day = Days[`day${d}`];

  const [ans1, ans2] = day.answers ?? [];

  if (ans1) {
    test("Part 1", () => {
      expect(day.part1(safetyNet(day.meta))).toEqual(ans1);
    });
  }

  if (ans2) {
    test("Part 2", () => {
      expect(day.part2(safetyNet(day.meta))).toEqual(ans2);
    });
  }
});
