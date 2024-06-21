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
  winPercents: number[];
}

export default function HistoricalModule(
  props: HistoricalModuleProps
): JSX.Element {
  return (
    <Module>
      <div className={styles.simulations}>
        <h3>Win Percentage Over Time</h3>
        <Historical
          raceType={props.raceType}
          dates={props.dates}
          winPercents={props.winPercents}
          state={props.state}
        />
      </div>
    </Module>
  );
}
