import { StackedBarChart } from "@/components/dataviz/LiveBarChart";
import Module from "../Module";
import { RaceType } from "@/types/RaceType";
import { State } from "@/types/State";
import { Party } from "@/types/Party";

import DemocratD from "../svgs/DemocratD";
import RepublicanR from "../svgs/RepublicanR";
import styles from "./LiveElectionModule.module.css";
import Trophy from "../svgs/Trophy";
import RingChart from "../svgs/RingChart";
import DownloadThisCard from "../DownloadThisCard";
import TiedRace from "../svgs/TiedRace";
import ExclamationMark from "../svgs/ExclamationMark";
import { useEffect, useState } from "react";

/**
 *
 * @returns {JSX.Element} The PredictionModule component.
 */
export interface SimulationsModuleProps {
  simulations: number[];
  raceType: RaceType;
  state: State;
  winner: Party;
}
export default function LiveElectionModule(
    props: SimulationsModuleProps
): JSX.Element {
  const [hoursToMidnight, setHoursToMidnight] = useState(0);

  useEffect(() => {
    //TODO: replace with however we're updating time
    const updateHoursToMidnight = () => {
      const now = new Date();
      const midnightET = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
      midnightET.setHours(24, 0, 0, 0); // Set time to midnight
      const hours = (midnightET.getTime() - now.getTime()) / 1000 / 60 / 60;
      setHoursToMidnight(Math.ceil(hours));
    };
    updateHoursToMidnight();
    const interval = setInterval(updateHoursToMidnight, 60 * 60 * 1000); // Update every hour
    return () => clearInterval(interval);
  }, []);

  return (
    <Module>
      <div className={styles.map}>
        <h3>Live Win Likelihood</h3>
        <p>Explanation about what this actually means</p>
        <StackedBarChart/>
      </div>
      <div className={styles.prediction}>
        <p className={styles.lastDataUpdate}>
        <svg width="16" height="16" className={styles.liveSymbol}>
          <circle cx="8" cy="8" r="5" fill="var(--republican-red)" />
          <circle cx="8" cy="8" r="5" className={styles.pulsingCircle} />
        </svg>
          Next update in {hoursToMidnight} hours
        </p>
        {props.state === State.Nebraska &&
        props.raceType === RaceType.Senate ? (
          <p className={styles.note}>
            *We are not predicting Nebraska&apos;s regular Senate election
            because there is no Democratic candidate.
          </p>
        ) : null}
        <DownloadThisCard />
      </div>
    </Module>
  );
}


// export interface SimulationsModuleProps {
//   simulations: number[];
//   raceType: RaceType;
//   state: State;
//   winner: Party;
// }

// export default function LiveElectionModule(
//   props: SimulationsModuleProps
// ): JSX.Element {
//   return (
//     <Module>
//       <div className={styles.simulations}>
//         <div>
//         <h3>Live Win Likihood</h3>
//       </div>
//         {/* <Histogram
//           race={props.raceType}
//           simulations={props.simulations}
//           state={props.state}
//           winner={props.winner}
//         /> */}
//         <StackedBarChart/>
//       </div>
//     </Module>
//   );
// }
