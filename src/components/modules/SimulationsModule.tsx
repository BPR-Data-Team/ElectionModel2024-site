import Module from "../Module";
import styles from "./SimulationsModule.module.css";

export interface SimulationsModuleProps {
  simulations: number[];
}

export default function SimulationsModule(
  props: SimulationsModuleProps
): JSX.Element {
  return (
    <Module>
      <div className={styles.simulations}>
        <h3>Margin Simulations</h3>
        Displaying {props.simulations.length} simulations
      </div>
    </Module>
  );
}
