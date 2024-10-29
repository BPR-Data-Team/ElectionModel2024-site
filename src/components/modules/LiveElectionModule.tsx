import { LiveBarChart } from "@/components/dataviz/LiveBarChart";
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
  console.log(props);
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
        <p>Current probability of victory, given the results of other races that we've called so far.</p>
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
