import DemocratD from "../svgs/DemocratD";
import RepublicanR from "../svgs/RepublicanR";
import Module from "../Module";
import styles from "./PredictionModule.module.css";
import Trophy from "../svgs/Trophy";
import RingChart from "../svgs/RingChart";
import DownloadThisCard from "../DownloadThisCard";
import { Party } from "@/types/Party";
import { RaceType } from "@/types/RaceType";
import { State } from "@/types/State";

export interface PredictionModuleProps {
  winner: Party;
  likelihood: number;
  margin: number;
  raceType: RaceType;
  state: State;
}

/**
 *
 * @returns {JSX.Element} The PredictionModule component.
 */
export default function PredictionModule(
  props: PredictionModuleProps
): JSX.Element {
  const getMessage = (): string => {
    let message: string = "";

    if (props.winner === Party.Democrat) {
      if (props.raceType === RaceType.presidential) {
        message = "Joe Biden is";
      } else {
        message = "Democrats are";
      }
    } else {
      if (props.raceType === RaceType.presidential) {
        message = "Donald Trump is";
      } else {
        message = "Republicans are";
      }
    }

    message += " favored to win the";

    switch (props.raceType) {
      case RaceType.gubernational:
        message += " gubernatorial election";
        break;
      case RaceType.House:
        message += " House";
        break;
      case RaceType.Senate:
        message += " Senate";
        break;
      case RaceType.presidential:
        message += " presidency";
        break;
    }

    if (props.state !== State.National) {
      message += ` in ${props.state}.`;
    } else {
      message += ".";
    }

    return message;
  };

  return (
    <Module>
      <div>
        <h3>24cast Prediction:</h3>
      </div>
      <div className={styles.prediction}>
        <div className={styles.mainPrediction}>
          <span className={styles.mainPredictionIcon}>
            {props.winner === Party.Democrat ? <DemocratD /> : <RepublicanR />}
          </span>
          <span className={styles.mainPredictionText}>{getMessage()}</span>
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
              <span className={styles.predictionInfoItemContent}>
                {props.likelihood}%
              </span>
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
              <span className={styles.predictionInfoItemContent}>
                +{props.margin}
              </span>
            </div>
          </div>
        </div>

        <DownloadThisCard />
      </div>
    </Module>
  );
}
