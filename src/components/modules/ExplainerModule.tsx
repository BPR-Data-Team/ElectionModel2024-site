import DownloadThisCard from "../DownloadThisCard";
import Module from "../Module";
import styles from "./ExplainerModule.module.css";

export default function ExplainerModule(): JSX.Element {
  return (
    <Module>
      <div className={styles.explainer}>
        <h3>How 24cast Predicted This Race</h3>
        <p>
          We ran <span className={styles.boldtext}>10,000</span> simulations predicting election margins using a
          machine learning model trained on data across multiple decades.
        </p>
        <p>Democrats won in <span className={styles.boldtext}>1173</span> simulations and lost 
          <span className={styles.boldtext}> 3456</span>.</p>
        <p>
          By running simulations with varied input data, we determined that{" "}
          <span className={styles.boldtext}>economic metrics</span>, <span className={styles.boldtext}>polling</span>, and <span className={styles.boldtext}>incumbency</span> were
          the most predictive factors in this race.
        </p>
        <p>
          <a href="/methodology" className={styles.methodologyLink}>
            Look through our full methodology!
          </a>
        </p>
        <DownloadThisCard />
      </div>
    </Module>
  );
}
