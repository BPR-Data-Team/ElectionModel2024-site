import Historical from "@/components/dataviz/Historical";
import Module from "../Module";
import styles from "./SimulationsModule.module.css";
import { RaceType } from "@/types/RaceType";
import { State } from "@/types/State";
import { Party } from "@/types/Party";

export interface HistoricalModuleProps {
  raceType: RaceType;
  state: State;
  dates: string[];
  demWinPercents: number[];
  repWinPercents: number[];
  tiePercents: number[];
}

export default function HistoricalModule(
  props: HistoricalModuleProps
): JSX.Element {
  return (
    <Module>
      <div className={styles.simulations}>
        <h3>Win Chances Over Time</h3>
        <Historical
          raceType={props.raceType}
          state={props.state}
          dates={props.dates}
          demWinPercents={props.demWinPercents}
          repWinPercents={props.repWinPercents}
          tiePercents={props.tiePercents}
        />
      </div>
    </Module>
  );
}