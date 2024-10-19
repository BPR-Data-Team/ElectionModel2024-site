import { StackedBarChart } from "@/components/dataviz/LiveBarChart";
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

export default function LiveElectionModule(
  props: SimulationsModuleProps
): JSX.Element {
  return (
    <Module>
      <div className={styles.simulations}>
        <h3>Live Predictions</h3>
        {/* <Histogram
          race={props.raceType}
          simulations={props.simulations}
          state={props.state}
          winner={props.winner}
        /> */}
        <StackedBarChart/>
      </div>
    </Module>
  );
}
