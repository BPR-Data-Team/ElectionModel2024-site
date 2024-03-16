import Image from "next/image";
import styles from "./page.module.css";
import Module from "@/components/Module";
import WelcomeModule from "@/components/modules/WelcomeModule";

export default function Home(): JSX.Element {
  return (
    <main className={styles.main}>
      <WelcomeModule />
    </main>
  );
}
