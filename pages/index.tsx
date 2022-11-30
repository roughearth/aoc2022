import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>AoC 2022</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          AoC 2022
        </h1>
        <ul>
          <li>Day 1</li>
        </ul>
      </main>
    </div>
  )
}
