import { Histogram } from "@/dataviz/Histogram";
import Module from "../Module";
import styles from "./SimulationsModule.module.css";
import { RaceType } from "@/types/RaceType";
import { State } from "@/types/State";
import { Party } from "@/types/Party";

export interface SimulationsModuleProps {
  simulations: number[];
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
          race={props.raceType}
          simulations={props.simulations}
          state={props.state}
          winner={props.winner}
        />
      </div>
    </Module>
  );
}
