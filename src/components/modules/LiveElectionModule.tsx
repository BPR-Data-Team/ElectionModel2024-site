import { LiveBarChart } from "@/components/dataviz/LiveBarChart";
import Module from "../Module";
import styles from "./LiveElectionModule.module.css";
import { Party } from "@/types/Party";
import { RaceType } from "@/types/RaceType";
import { State, getNumDistricts } from "@/types/State";
import { useEffect, useState } from "react";

export interface LiveElectionModuleProps {
  demPercent: number;
  repPercent: number;
  tiePercent: number;
  updatedAt: Date;
  isCalled: string;
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

export default function LiveElectionModule(
  props: LiveElectionModuleProps
): JSX.Element {
  console.log(props);
  const [predictionMessage, setPredictionMessage] = useState<string>("");
  const [likelihood, setLikelihood] = useState<number>(0);
  const [margin, setMargin] = useState<number>(0);
  const [icon, setIcon] = useState<JSX.Element>(<></>);
  const [loadTime, setLoadTime] = useState('');

  useEffect(() => {
    if (props.fetchComplete) {
      setPredictionMessage(getMessage());
      setLikelihood(props.likelihood);
      setMargin(getMargin());
      const now = new Date();
      setLoadTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
  }, [props.fetchComplete]);

  const getMessage = (): string => {
    if (props.weird != "") {
      return props.weird;
    }
    if (
      props.raceType === RaceType.Senate &&
      props.state === State.National &&
      props.margin === 50
    ) {
      return "24cast.org is projecting the Senate to be a 50-50 split.";
    }

    let message: string = "24cast.org is projecting ";

    if (props.winner === Party.Democrat) {
        if (props.raceType === RaceType.Presidential) {
            message += "Kamala Harris to win the presidency"
        } else {
            message += "the Democrat to win the ";
        }
    } else {
        if (props.raceType === RaceType.Presidential) {
            message += "Donald Trump to win the presidency"
        } else {
            message += "the Republican to win the ";
        }
    }

    switch (props.raceType) {
      case RaceType.Gubernatorial:
        message += " gubernatorial election";
        break;
      case RaceType.House:
        message += "House";
        break;
      case RaceType.Senate:
        message += "Senate";
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
      <div className={styles.container} id="likelihood">
        <h3 className={styles.header}>
          Current Win Likelihood
        </h3>
        <p className={styles.introText}>The current probability of victory, given the results of other races that we've called so far.</p>
        <div className={styles.prediction}>
            <h3 className={styles.mainText}>
              {predictionMessage}
              {/* <a href="#likely-outcomes" className={styles.linkText}>
                Scroll down to see likely electoral outcomes.
              </a> */}
            </h3>
        </div>
        <LiveBarChart
          demPercent={props.demPercent}
          repPercent={props.repPercent}
          tiePercent={props.tiePercent}
        />
        <p className={styles.lastDataUpdate}>
          <svg width="16" height="16" className={styles.liveSymbol}>
            <circle cx="8" cy="8" r="5" fill="var(--republican-red)" />
            <circle cx="8" cy="8" r="5" className={styles.pulsingCircle} />
          </svg>
          As of {loadTime}. <a className={styles.linkText} href="#likelihood" onClick={() => window.location.reload()}>Reload</a> for updated likelihood data.
        </p>
      </div>
    </Module>
  );
}
