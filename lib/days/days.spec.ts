import { Days } from '.';
import { safetyNet } from '../utils';
import { currentDay } from '../utils/dates';

console.log(process.env.TODAY)

// for day 13
const PFKLKCFP = `
###..####.#..#.#....#..#..##..####.###..
#..#.#....#.#..#....#.#..#..#.#....#..#.
#..#.###..##...#....##...#....###..#..#.
###..#....#.#..#....#.#..#....#....###..
#....#....#.#..#....#.#..#..#.#....#....
#....#....#..#.####.#..#..##..#....#....
`.trim();

const dayResults: [number, number | string, number | string][] = [
// day,  part 1 answer     , part 2 answer
  [1, 67027, 197291],
  [ 2 ,  1                 , 1                  ],
  [ 3 ,  1                 , 1                  ],
  [ 4 ,  1                 , 1                  ],
  [ 5 ,  1                 , 1                  ],
  [ 6 ,  1                 , 1                  ],
  [ 7 ,  1                 , 1                  ],
  [ 8 ,  1                 , 1                  ],
  [ 9 ,  1                 , 1                  ],
  [ 10,  1                 , 1                  ],
  [ 11,  1                 , 1                  ],
  [ 12,  1                 , 1                  ],
  [ 13,  1                 , 1                  ],
  [ 14,  1                 , 1                  ],
  [ 15,  1                 , 1                  ],
  [ 16,  1                 , 1                  ],
  [ 17,  1                 , 1                  ],
  [ 18,  1                 , 1                  ],
  [ 19,  1                 , 1                  ],
  [ 20,  1                 , 1                  ],
  [ 21,  1                 , 1                  ],
  [ 22,  1                 , 1                  ],
  [ 23,  1                 , 1                  ],
  [ 24,  1                 , 1                  ],
  [ 25,  1                 , "Merry Xmas!"      ]
].filter(([d]) => d === currentDay());

describe.each(dayResults)("Day %i", (d: number, ans1?: number | string, ans2?: number | string) => {
  const day = Days[`day${d}`];

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
