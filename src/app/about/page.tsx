import styles from "./page.module.css";
import type { Metadata } from "next";

export function About(): JSX.Element {
  return <main className={styles.main}>About</main>;
}

export const metadata: Metadata = {
  title: 'About | 24cast.org',
};

const AboutPage: React.FC = () => {
  return (
    <div className={styles.center}>
      <h1>About 24cast</h1>
      <p>
        This isn't your typical election prediction—we use an all-new method to determine the outcomes
          of races down to the margin and break down <i>exactly</i> how each race's history
          affects expected outcomes.
      </p>
      <p>
        24cast is produced by the Brown Political Review's Data Board. When the Data Board isn't innovating
        election predictions, our team writes <a className={styles.linkText} href='https://brownpoliticalreview.org/category/data/'>data-driven articles</a> for BPR
        and creates data visualizations for <a className={styles.linkText} href='https://brownpoliticalreview.org/'>articles</a> written by BPR's Editorial Board.
      </p>
      <p>
        24cast is the successor to an <a className={styles.linkText} href='https://brownpoliticalreview.org/2022/10/senate-midterm-forecast-model/'>election model</a> produced by BPR during the previous election cycle
        featuring a fully revised structure (learn more at our <a className={styles.linkText} href="/">methodology</a> page!)
      </p>
      <p>
        <b>Please contact us with any questions, ideas, or press inquiries at <a className={styles.linkText} href="mailto: asher_labovich@brown.edu">this email</a>.</b>
      </p>
      {/* consider adding email address straight in here instead of linking it */}
      <p>
        Spearheaded by founder Asher Labovich, 24cast is the product of months of effort
        by a team of Brown students, who we wish to highlight below:
      </p>
      <p>
      </p>
      <p>
      </p>

      
    </div>
  );
};





export default AboutPage;