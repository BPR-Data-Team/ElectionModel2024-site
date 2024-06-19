import { Historical } from "@/components/dataviz/Historical";
import Module from "../Module";
import styles from "./SimulationsModule.module.css";
import { RaceType } from "@/types/RaceType";
import { State } from "@/types/State";
import { Party } from "@/types/Party";

export interface HistoricalModuleProps {
  raceType: RaceType;
  state: State;
  dates: string[];
  winMargins: number[];
}

export default function HistoricalModule(
  props: HistoricalModuleProps
): JSX.Element {
  return (
    <Module>
      <div className={styles.simulations}>
        <h3>Margin Simulations</h3>
        <Historical
          binBounds={props.binBounds}
          binEdges={props.binEdges}
          bins={props.bins}
          raceType={props.raceType}
          state={props.state}
          winner={props.winner}
        />
      </div>
    </Module>
  );
}
