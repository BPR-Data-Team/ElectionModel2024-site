import { Histogram } from "@/dataviz/Histogram";
import Module from "../Module";
import styles from "./SimulationsModule.module.css";
import { RaceType } from "@/types/RaceType";
import { State } from "@/types/State";
import { Party } from "@/types/Party";

export interface SimulationsModuleProps {
  binBounds: [number, number];
  binEdges: number[];
  bins: number[];
  raceType: RaceType;
  state: State;
  winner: Party;
}

export default function SimulationsModule(
  props: SimulationsModuleProps
): JSX.Element {
  return (
    <Module>
      <div className={styles.simulations}>
        <h3>Margin Simulations</h3>
        <Histogram
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
