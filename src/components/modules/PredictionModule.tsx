import DemocratD from "../svgs/DemocratD";
import Module, { ModuleProps } from "../Module";
import styles from "./PredictionModule.module.css";
import Trophy from "../svgs/Trophy";
import RingChart from "../svgs/RingChart";
import DownloadThisCard from "../DownloadThisCard";

/**
 *
 * @param {ModuleProps} props The properties for the PredictionModule component.
 * @returns {JSX.Element} The PredictionModule component.
 */
export default function PredictionModule(props: ModuleProps): JSX.Element {
  return (
    <Module width={props.width} gridArea={props.gridArea}>
      <div className={styles.prediction}>
        <h3>24cast Prediction:</h3>

        <div className={styles.mainPrediction}>
          <span className={styles.mainPredictionIcon}>
            <DemocratD />
          </span>
          <span className={styles.mainPredictionText}>
            Joe Biden is favored to win the presidency in North Dakota.
          </span>
        </div>

        <div className={styles.predictionInfo}>
          <div className={styles.predictionInfoItem}>
            <div className={styles.predictionInfoItemIcon}>
              <Trophy />
            </div>
            <div className={styles.predictionInfoItemText}>
              <h4 className={styles.predictionInfoItemHeader}>
                Outcome Likelihood:
              </h4>
              <span className={styles.predictionInfoItemContent}>78%</span>
            </div>
          </div>

          <div className={styles.predictionInfoItem}>
            <div className={styles.predictionInfoItemIcon}>
              <RingChart />
            </div>
            <div className={styles.predictionInfoItemText}>
              <h4 className={styles.predictionInfoItemHeader}>
                Predicted Margin:
              </h4>
              <span className={styles.predictionInfoItemContent}>+3.43</span>
            </div>
          </div>
        </div>

        <DownloadThisCard />
      </div>
    </Module>
  );
}
