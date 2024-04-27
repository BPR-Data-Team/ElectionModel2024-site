import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Methodology',
};

export default function Methodology(): JSX.Element {
  return <main className={styles.main}>Methodology</main>;
}
