import Module from "../Module";
import styles from "./SimulationsModule.module.css";

export default function SimulationsModule(): JSX.Element {
  return (
    <Module>
      <div className={styles.simulations}>
        <h3>Margin Simulations</h3>
      </div>
    </Module>
  );
}
