import DemocratD from "../svgs/DemocratD";
import RepublicanR from "../svgs/RepublicanR";
import Module from "../Module";
import styles from "./PredictionModule.module.css";
import Trophy from "../svgs/Trophy";
import RingChart from "../svgs/RingChart";
import DownloadThisCard from "../DownloadThisCard";
import { Party } from "@/types/Party";
import { RaceType } from "@/types/RaceType";
import { State, getNumDistricts } from "@/types/State";
import TiedRace from "../svgs/TiedRace";
import ExclamationMark from "../svgs/ExclamationMark";
import { useEffect, useState } from "react";

export interface PredictionModuleProps {
  winner: Party;
  likelihood: number;
  margin: number;
  raceType: RaceType;
  state: State;
  district: number;
  weird: string;
  fetchComplete: boolean;
}

/**
 *
 * @returns {JSX.Element} The PredictionModule component.
 */
export default function PredictionModule(
  props: PredictionModuleProps
): JSX.Element {
  const [predictionMessage, setPredictionMessage] = useState<string>("");
  const [likelihood, setLikelihood] = useState<number>(0);
  const [margin, setMargin] = useState<number>(0);
  const [icon, setIcon] = useState<JSX.Element>(<></>);

  useEffect(() => {
    if (props.fetchComplete) {
      setPredictionMessage(getMessage());
      setLikelihood(props.likelihood);
      setMargin(getMargin());
      setIcon(getIcon());
    }
  }, [props.fetchComplete]);

  const getIcon = (): JSX.Element => {
    if (props.weird != "") {
      return <ExclamationMark />;
    }
    if (props.winner === Party.Democrat) {
      return <DemocratD />;
    } else if (props.winner === Party.Republican) {
      return <RepublicanR />;
    } else {
      return <TiedRace />;
    }
  };

  const getMessage = (): string => {
    if (props.weird != "") {
      return props.weird;
    }
    if (
      props.raceType === RaceType.Senate &&
      props.state === State.National &&
      props.margin === 50
    ) {
      return "The Senate is predicted to be a 50-50 split.";
    }

    let message: string = "";

    if (props.winner === Party.Democrat) {
      if (props.raceType === RaceType.Presidential) {
        message = "Joe Biden is";
      } else {
        message = "Democrats are";
      }
    } else {
      if (props.raceType === RaceType.Presidential) {
        message = "Donald Trump is";
      } else {
        message = "Republicans are";
      }
    }

    if (props.likelihood < 60) {
      message += " slightly";
    } else if (props.likelihood > 80 && props.likelihood < 98) {
      message += " heavily";
    } else if (props.likelihood >= 98) {
      message += " overwhelmingly";
    }

    message += " favored to win the";

    switch (props.raceType) {
      case RaceType.Gubernatorial:
        message += " gubernatorial election";
        break;
      case RaceType.House:
        message += " House";
        break;
      case RaceType.Senate:
        message += " Senate";
        break;
      case RaceType.Presidential:
        message += " presidency";
        break;
    }

    if (props.state === State.Nebraska && props.raceType === RaceType.Senate) {
      message += " special election";
    }

    if (props.state !== State.National) {
      message += ` in ${props.state}`;
      if (
        (props.raceType == RaceType.House ||
          (props.raceType == RaceType.Presidential &&
            (props.state === State.Nebraska || props.state === State.Maine))) &&
        props.district > 0
      ) {
        if (
          [
            State.Arkansas,
            State.Illinois,
            State.Kansas,
            State.Massachusetts,
            State.Texas,
          ].includes(props.state)
        ) {
          message += `'`;
        } else {
          message += `'s `;
        }
        if (getNumDistricts(props.state) === 1) {
          message += "at-large";
        } else {
          message += ` ${props.district}`;
          switch (props.district) {
            case 1:
            case 21:
            case 31:
            case 41:
            case 51:
              message += "st";
              break;
            case 2:
            case 22:
            case 32:
            case 42:
            case 52:
              message += "nd";
              break;
            case 3:
            case 23:
            case 33:
            case 43:
            case 53:
              message += "rd";
              break;
            default:
              message += "th";
              break;
          }
        }
        message += " district";
      }
    }
    message += ".";
    if (props.state === State.Nebraska && props.raceType === RaceType.Senate) {
      message += "*";
    }

    return message;
  };

  const getMargin = (): number => {
    if (props.state !== State.National || props.winner === Party.Democrat)
      return props.margin;
    switch (props.raceType) {
      case RaceType.Presidential:
        return 538 - props.margin;
      case RaceType.Senate:
        return 100 - props.margin;
      case RaceType.House:
        return 435 - props.margin;
      default:
        return props.margin;
    }
  };
  return (
    <Module>
      <div>
        <h3>24cast.org Prediction:</h3>
      </div>
      <div className={styles.prediction}>
        <div className={styles.mainPrediction}>
          <span className={styles.mainPredictionIcon}>{icon}</span>
          <span className={styles.mainPredictionText}>{predictionMessage}</span>
        </div>

        {props.weird == "" ? (
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
                  {likelihood === 100 ? ">99" : likelihood}%
                </span>
              </div>
            </div>

            <div className={styles.predictionInfoItem}>
              <div className={styles.predictionInfoItemIcon}>
                <RingChart />
              </div>
              <div className={styles.predictionInfoItemText}>
                <h4 className={styles.predictionInfoItemHeader}>
                  {props.state === State.National
                    ? props.raceType === RaceType.Presidential
                      ? "Electoral Votes"
                      : "Seats"
                    : "Margin"}
                  :
                </h4>
                <span className={styles.predictionInfoItemContent}>
                  {props.state !== State.National && margin > 0.1 ? "+" : ""}
                  {margin < 0.1 ? "<0.1" : margin}
                </span>
              </div>
            </div>
          </div>
        ) : null}
        <p className={styles.lastDataUpdate}>
          Last data update: {`${new Date().toLocaleDateString()}`}{" "}
          {/*TODO: make this real */}
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
