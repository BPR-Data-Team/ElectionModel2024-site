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
  numSimulations: number;
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
      // setMargin(getMargin());
      const now = new Date();
      setLoadTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
  }, [props.fetchComplete]);

  const getMessage = (): string => {
    if (!props.isCalled || props.isCalled==="NC") {
      return ""
    }
    if (props.weird != "") {
      return props.weird;
    }
    if (
      props.raceType === RaceType.Senate &&
      props.state === State.National &&
      props.tiePercent>props.demPercent &&
      props.tiePercent>props.repPercent
    ) {
      return "24cast.org is calling the Senate to be a 50-50 split.";
    }

    let message: string = "24cast.org is calling the ";

    switch (props.raceType) {
      case RaceType.Gubernatorial:
        message += " gubernatorial election ";
        break;
      case RaceType.House:
        message += "House ";
        break;
      case RaceType.Senate:
        message += "Senate ";
        break;
      case RaceType.Presidential:
        message += "presidency ";
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

    if (props.demPercent > props.repPercent && props.demPercent > props.tiePercent) {
      if (props.raceType === RaceType.Presidential) {
          message += " for Kamala Harris";
      } else if (props.state === State.National) {
        message += " for the Democrats";
      } else {
          message += " for the Democratic candidate";
      }
  } else if (props.repPercent > props.demPercent && props.repPercent > props.tiePercent) {
      if (props.raceType === RaceType.Presidential) {
          message += " for Donald Trump";
      } else if (props.state === State.National) {
          message += " for the Republicans";
      } else {
        message += " for the Republican candidate";
      }
  } else {
    if (props.raceType === RaceType.Presidential) {
      message += " as a tie in the Electoral College";
    } else if (props.state === State.National) {
      message += " as a tie";
    } else {
      message += " as a tie";
    }
  }

    message += ".";
    if (props.state === State.Nebraska && props.raceType === RaceType.Senate) {
      message += "*";
    }

    return message;
  };

  // const getMargin = (): number => {
  //   if (props.state !== State.National || props.winner === Party.Democrat)
  //     return props.margin;
  //   switch (props.raceType) {
  //     case RaceType.Presidential:
  //       return 538 - props.margin;
  //     case RaceType.Senate:
  //       return 100 - props.margin;
  //     case RaceType.House:
  //       return 435 - props.margin;
  //     default:
  //       return props.margin;
  //   }
  // };
  return (
    <Module>
      {(props.isCalled==="NC" || !props.isCalled) ? (
        // race not called case
      <div className={styles.container} id="likelihood">
        {props.raceType === RaceType.Senate && props.state === State.National ? (
          <h3 className={styles.header}>
            Current Win Likelihood*
          </h3>
          ) : (
            <h3 className={styles.header}>
              Current Win Likelihood
            </h3>
          )}
        <p className={styles.introText}>The current probability of victory, given the results of other races that we&apos;ve called so far.</p>
        <div className={styles.prediction}>
            <h3 className={styles.mainText}>
              {predictionMessage}
              {/* <a href="#likely-outcomes" className={styles.linkText}>
                Scroll down to see likely electoral outcomes.
              </a> */}
            </h3>
        </div>
        <LiveBarChart
          demPercent={props.demPercent / props.numSimulations * 100}
          repPercent={props.repPercent / props.numSimulations * 100}
          tiePercent={props.tiePercent / props.numSimulations * 100}
        />
        <p className={styles.lastDataUpdate}>
          <svg width="16" height="16" className={styles.liveSymbol}>
            <circle cx="8" cy="8" r="5" fill="var(--republican-red)" />
            <circle cx="8" cy="8" r="5" className={styles.pulsingCircle} />
          </svg>
          As of {loadTime}. <a className={styles.linkText} href="#likelihood" onClick={() => window.location.reload()}>Reload</a> for updated likelihood data.
        </p>
        {props.state === State.National &&
          props.raceType === RaceType.Senate ? (
            <p className={styles.note}>
              *We are not predicting Nebraska&apos;s regular Senate election, because an Independent candidate is running against a Republican candidate.
              This distribution assumes a Republican victory in this race, despite the race being considered a tossup.
            </p>
          ) : null}
        {props.state === State.Nebraska &&
        props.raceType === RaceType.Senate ? (
          <p className={styles.note}>
            *We are not predicting Nebraska&apos;s regular Senate election
            because there is no Democratic candidate.
          </p>
        ) : null}
      </div>
      ) : (props.isCalled && props.isCalled != "Loading") ? (
        // race called case
        <div className={styles.container} id="likelihood">
          <h3 className={styles.header}>

          </h3>
          <p className={styles.introText}></p>
          <div className={styles.prediction}>
              <h3 className={styles.mainText}>
                {predictionMessage}
                {/* <a href="#likely-outcomes" className={styles.linkText}>
                  Scroll down to see likely electoral outcomes.
                </a> */}
              </h3>
          </div>
          <LiveBarChart
            demPercent={props.demPercent / props.numSimulations * 100}
            repPercent={props.repPercent / props.numSimulations * 100}
            tiePercent={props.tiePercent / props.numSimulations * 100}
          />
          <p className={styles.lastDataUpdate}>
            <svg width="16" height="16" className={styles.liveSymbol}>
              <circle cx="8" cy="8" r="5" fill="var(--republican-red)" />
              <circle cx="8" cy="8" r="5" className={styles.pulsingCircle} />
            </svg>
            As of {loadTime}. <a className={styles.linkText} href="#likelihood" onClick={() => window.location.reload()}>Reload</a> for updated likelihood data.
          </p>
          {props.state === State.National &&
          props.raceType === RaceType.Senate ? (
            <p className={styles.note}>
              *We are not predicting Nebraska&apos;s regular Senate election, because an Independent candidate is running against a Republican candidate.
              This distribution assumes a Republican victory in this race, despite the race being considered a tossup.
            </p>
          ) : null}
          {props.state === State.Nebraska &&
          props.raceType === RaceType.Senate ? (
            <p className={styles.note}>
              *We are not predicting Nebraska&apos;s regular Senate election
              because there is no Democratic candidate.
            </p>
          ) : null}
        </div>
      ) : (
        // loading case
        <div className={styles.container} id="likelihood">
          <h3 className={styles.header}>

          </h3>
          <p className={styles.introText}></p>
          <div className={styles.prediction}>
              <h3 className={styles.mainText}>
                {predictionMessage}
                {/* <a href="#likely-outcomes" className={styles.linkText}>
                  Scroll down to see likely electoral outcomes.
                </a> */}
              </h3>
          </div>
          <LiveBarChart
            demPercent={props.demPercent / props.numSimulations * 100}
            repPercent={props.repPercent / props.numSimulations * 100}
            tiePercent={props.tiePercent / props.numSimulations * 100}
          />
          <p className={styles.lastDataUpdate}>
            <svg width="16" height="16" className={styles.liveSymbol}>
              <circle cx="8" cy="8" r="5" fill="var(--republican-red)" />
              <circle cx="8" cy="8" r="5" className={styles.pulsingCircle} />
            </svg>
            Loading...
          </p>
        </div>  
      )}
    </Module>
  );
}
