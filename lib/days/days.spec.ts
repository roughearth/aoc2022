import { Days } from '.';
import { safetyNet } from '../utils';
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

const dayResults = (<[number, number | string, number | string][]>[
// day,  part 1 answer     , part 2 answer
  [ 1 ,  67027             , 197291             ],
  [ 2 ,  13809             , 12316              ],
  [ 3 ,  7967              , 2716               ],
  [ 4 ,  433               , 852                ],
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
]).filter(([d]) => dayFilter(d));

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
