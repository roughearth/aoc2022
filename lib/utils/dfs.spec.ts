import { dfsFrom } from "./dfs";

describe("DFS", () => {
  it("simple", () => {
    const dfs = dfsFrom(
      "0|",
      n => {
        const [levelSrc, tuple] = n.split("|");
        const coords = tuple.split(",").filter(Boolean).map(Number);

        const level = Number(levelSrc || -1);

        if (level >= 3) {
          return [];
        }

        const next = [];

        for (let i = 0; i < 3; i++) {
          coords[level] = i;
          next.push(`${level + 1}|${coords.join(",")}`);
        }

        return next;
      }
    );

    expect(Array.from(dfs)).toEqual([
      '0|',
      '1|2',
      '2|2,2',
      '3|2,2,2',
      '3|2,2,1',
      '3|2,2,0',
      '2|2,1',
      '3|2,1,2',
      '3|2,1,1',
      '3|2,1,0',
      '2|2,0',
      '3|2,0,2',
      '3|2,0,1',
      '3|2,0,0',
      '1|1',
      '2|1,2',
      '3|1,2,2',
      '3|1,2,1',
      '3|1,2,0',
      '2|1,1',
      '3|1,1,2',
      '3|1,1,1',
      '3|1,1,0',
      '2|1,0',
      '3|1,0,2',
      '3|1,0,1',
      '3|1,0,0',
      '1|0',
      '2|0,2',
      '3|0,2,2',
      '3|0,2,1',
      '3|0,2,0',
      '2|0,1',
      '3|0,1,2',
      '3|0,1,1',
      '3|0,1,0',
      '2|0,0',
      '3|0,0,2',
      '3|0,0,1',
      '3|0,0,0'
    ]);

    expect(Array.from(dfs.leafs())).toEqual([
      '3|2,2,2',
      '3|2,2,1',
      '3|2,2,0',
      '3|2,1,2',
      '3|2,1,1',
      '3|2,1,0',
      '3|2,0,2',
      '3|2,0,1',
      '3|2,0,0',
      '3|1,2,2',
      '3|1,2,1',
      '3|1,2,0',
      '3|1,1,2',
      '3|1,1,1',
      '3|1,1,0',
      '3|1,0,2',
      '3|1,0,1',
      '3|1,0,0',
      '3|0,2,2',
      '3|0,2,1',
      '3|0,2,0',
      '3|0,1,2',
      '3|0,1,1',
      '3|0,1,0',
      '3|0,0,2',
      '3|0,0,1',
      '3|0,0,0'
    ]);
  });

  it("circular", () => {
    const dfs = dfsFrom(
      "0|",
      n => {
        const [levelSrc, tuple] = n.split("|");
        const coords = tuple.split(",").filter(Boolean).map(Number);

        const level = Number(levelSrc || -1);

        if (level >= 3) {
          return ['0|'];
        }

        const next = [];

        for (let i = 0; i < 3; i++) {
          coords[level] = i;
          next.push(`${level + 1}|${coords.join(",")}`);
        }

        return next;
      }
    );

    expect(Array.from(dfs)).toEqual([
      '0|',
      '1|2',
      '2|2,2',
      '3|2,2,2',
      '3|2,2,1',
      '3|2,2,0',
      '2|2,1',
      '3|2,1,2',
      '3|2,1,1',
      '3|2,1,0',
      '2|2,0',
      '3|2,0,2',
      '3|2,0,1',
      '3|2,0,0',
      '1|1',
      '2|1,2',
      '3|1,2,2',
      '3|1,2,1',
      '3|1,2,0',
      '2|1,1',
      '3|1,1,2',
      '3|1,1,1',
      '3|1,1,0',
      '2|1,0',
      '3|1,0,2',
      '3|1,0,1',
      '3|1,0,0',
      '1|0',
      '2|0,2',
      '3|0,2,2',
      '3|0,2,1',
      '3|0,2,0',
      '2|0,1',
      '3|0,1,2',
      '3|0,1,1',
      '3|0,1,0',
      '2|0,0',
      '3|0,0,2',
      '3|0,0,1',
      '3|0,0,0'
    ]);

    expect(Array.from(dfs.leafs())).toEqual([]);
  });

  it("pruned", () => {
    const dfs = dfsFrom(
      "0|",
      n => {
        const [levelSrc, tuple] = n.split("|");
        const coords = tuple.split(",").filter(Boolean).map(Number);

        const level = Number(levelSrc || -1);

        if (level >= 3) {
          if (coords[0] !== coords[1]) {
            return;
          }
          return [];
        }

        const next = [];

        for (let i = 0; i < 3; i++) {
          coords[level] = i;
          next.push(`${level + 1}|${coords.join(",")}`);
        }

        return next;
      }
    );

    expect(Array.from(dfs.leafs())).toEqual([
      '3|2,2,2',
      '3|2,2,1',
      '3|2,2,0',
      // '3|2,1,2',
      // '3|2,1,1',
      // '3|2,1,0',
      // '3|2,0,2',
      // '3|2,0,1',
      // '3|2,0,0',
      // '3|1,2,2',
      // '3|1,2,1',
      // '3|1,2,0',
      '3|1,1,2',
      '3|1,1,1',
      '3|1,1,0',
      // '3|1,0,2',
      // '3|1,0,1',
      // '3|1,0,0',
      // '3|0,2,2',
      // '3|0,2,1',
      // '3|0,2,0',
      // '3|0,1,2',
      // '3|0,1,1',
      // '3|0,1,0',
      '3|0,0,2',
      '3|0,0,1',
      '3|0,0,0'
    ]);
  });
});
