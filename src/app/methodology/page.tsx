import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology | 24cast.org",
};

const Methodology: React.FC = () => {
  return (
      <div className={styles.overall}>
        <div className={styles.main}>
              <h2>Methodology</h2>
              <p>Last Updated: May 6, 2024</p>
          </div>
          <div className={styles.main}>
              <p>Coming soon, we promise!</p>
          </div>
      </div>

  );
};


export default Methodology;