import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About | 24cast',
};

export default function About(): JSX.Element {
  return <main className={styles.main}>About</main>;
}
