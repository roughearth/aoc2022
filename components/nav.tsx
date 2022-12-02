import Link from 'next/link'
import leaderBoardMap from '../lib/.leaderboardListRc.json'
import { currentDay } from "../lib/utils/dates";
import style from './nav.module.scss';


const decemberDays = [
  [
    -3, -2, -1,
    ...Array.from({ length: 4 }, (_, i) => `${i + 1}`)
  ],
  Array.from({ length: 7 }, (_, i) => `${i + 5}`),
  Array.from({ length: 7 }, (_, i) => `${i + 12}`),
  Array.from({ length: 7 }, (_, i) => `${i + 19}`),
]

const Nav: React.FC = () => {
  return (
    <>
      <h4>Nav</h4>
      <p><Link href={`/day/${currentDay()}`}>Today</Link></p>
      <table className={style.navCalendar}>
        <thead>
          <tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr>
        </thead>
        <tbody>{
          decemberDays.map((week) => <tr key={week[6]} data-key={week[6]}>{
            week.map((day) => <td align="right" key={day} data-key={day}>{
              (day > 0) ? <Link href={`/day/${day}`}>{day}</Link> : ' '
            }</td>)
          }</tr>)
        }</tbody>
      </table>
      <ul className={style.navList}>
        {leaderBoardMap && leaderBoardMap.map(([id, name]) => (
          <li key={id}>
            <a href={`https://adventofcode.com/2022/leaderboard/private/view/${id}`} target="_blank" rel="noreferrer">{name} leaderboard</a>
          </li>
        ))}
        <li><a href="https://adventofcode.com/2022/" target="_blank" rel="noreferrer">AoC 2022</a></li>
      </ul>
    </>
  );
}

export default Nav;

