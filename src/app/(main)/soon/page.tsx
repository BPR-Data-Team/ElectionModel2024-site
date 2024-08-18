import styles from "./page.module.css";
import type { Metadata } from "next";
import Construction from "@/components/svgs/Construction";
import { races } from "@/components/modules/KeyRacesModule";
import Image from "next/image";
import bulletPoint from "image-assets/ballot-sequence/ballot-anim00.png";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coming Soon | 24cast.org",
};

const ComingSoonPage = () => {

  return (
    <div className={styles.center}>
      <h1 className={styles.heading}>
        <Construction />
      </h1>
      <h1>This page is coming soon.</h1>
      <p>
        In the meantime,{" "}
        <a href="/" className={styles.linkText}>check out our predictions</a>.
      </p>
      {/* <div className={styles.grid}>
        {races.map((race, index) => (
          <div
            key={index}
            className={styles.race}
          >
            <Image src={bulletPoint} width={15} alt="bullet point" />
            <Link href="/">
              {race}
            </Link>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ComingSoonPage;