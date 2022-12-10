import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from 'next/router'
import { Days } from "../../lib/days";
import { safetyNet, timeAndRun } from "../../lib/utils";
import Nav from "../../components/nav";

const App: React.FC = () => {
  const router = useRouter()
  const { day } = router.query

  const { part1, part2, meta, meta: { manualStart = false } = {} } = useMemo(
    () => Days[`day${day}`] ?? {},
    [day]
  );

  const startPart1 = useCallback(
    () => setPart1(timeAndRun(() => part1(safetyNet(meta)))),
    [part1, meta]
  )

  const startPart2 = useCallback(
    () => setPart2(timeAndRun(() => part2(safetyNet(meta)))),
    [part2, meta]
  )

  const [[result1, duration1], setPart1] = useState<[string | number, number]>(["", 0]);
  const [[result2, duration2], setPart2] = useState<[string | number, number]>(["", 0]);

  useEffect(
    () => {
      if (meta) {
        if (manualStart) {
          setPart1(["", 0]);
          setPart2(["", 0]);
        }
        else {
          startPart1();
          startPart2();
        }
      }
    },
    [meta, manualStart, startPart1, startPart2]
  )

  // ✔×

  return (
    <>
      <h1>AoC 2022 - Day {day}</h1>
      <p><a href={`https://adventofcode.com/2022/day/${day}`} target="_blank" rel="noreferrer">Problem</a></p>
      <div className="parts">
        <div className="part">
          <h2>Part 1</h2>
          <pre><big><b>{result1}</b></big></pre>
          <p><small><i>(in {duration1}ms)</i></small></p>
          {manualStart && <p>
            <button type="button" onClick={startPart1}>start</button>
          </p>}
        </div>
        <div className="part">
          <h2>Part 2</h2>
          <pre><big><b>{result2}</b></big></pre>
          <p><small><i>(in {duration2}ms)</i></small></p>
          {manualStart && <p>
            <button type="button" onClick={startPart2}>start</button>
          </p>}
        </div>
      </div>

      <Nav />
    </>
  );
}

export default App

