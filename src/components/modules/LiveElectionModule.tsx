import LiveBarChart from "@/components/dataviz/LiveBarChart";
import Module from "../Module";

import styles from "./LiveElectionModule.module.css";
import DownloadThisCard from "../DownloadThisCard";

/**
 *
 * @returns {JSX.Element} The PredictionModule component.
 */
export interface LiveElectionModuleProps {
  demPercent: number;
  repPercent: number;
  tiePercent: number;
  updatedAt: Date;
}
export default function LiveElectionModule(
  props: LiveElectionModuleProps
): JSX.Element {
  return (
    <Module>
      <div className={styles.map}>
        <h3>
          <svg width="16" height="16" className={styles.liveSymbol}>
            <circle cx="8" cy="8" r="5" fill="var(--republican-red)" />
            <circle cx="8" cy="8" r="5" className={styles.pulsingCircle} />
          </svg>
          Live Win Likelihood
        </h3>
        <p>Explanation about what this actually means</p>
        <LiveBarChart
          demPercent={props.demPercent}
          repPercent={props.repPercent}
          tiePercent={props.tiePercent}
        />
      </div>
      <div className={styles.prediction}>
        <p className={styles.lastDataUpdate}>
          Last updated: {props.updatedAt.toLocaleTimeString()}
        </p>
        <DownloadThisCard />
      </div>
    </Module>
  );
}
