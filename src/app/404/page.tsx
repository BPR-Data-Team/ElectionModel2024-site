import styles from "./page.module.css";
import type { Metadata } from "next";
import { races } from "@/components/modules/KeyRacesModule";
import Image from "next/image";
import bulletPoint from "image-assets/ballot-sequence/ballot-anim00.png";

export const metadata: Metadata = {
  title: "404 | 24cast.org",
};

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.center}>
      <h1 className={styles.heading}>404</h1>
      <p>
        <b>The page you are looking for does not exist.</b>
      </p>
      <p>
        Check the URL for typos or take a look at one of these races:
        <a href="/"></a>
      </p>
      <div className={styles.grid}>
        {races.map((race, index) => (
          <div key={index} className={styles.race}>
            <Image src={bulletPoint} width={15} alt="bullet point" />
            <p>{race}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotFoundPage;
