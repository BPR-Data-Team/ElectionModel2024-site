import Module, { ModuleProps } from "../Module";
import styles from "./SimulationsModule.module.css";

export default function SimulationsModule(props: ModuleProps): JSX.Element {
  return (
    <Module width={props.width} gridArea={props.gridArea}>
      <div className={styles.simulations}>
        <h2>Simulations</h2>
        <p>
          We simulate the election 10,000 times to determine the probability of
          each party winning the election.
        </p>
      </div>
    </Module>
  );
}
