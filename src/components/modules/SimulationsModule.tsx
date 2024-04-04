import Module, { ModuleProps } from "../Module";
import styles from "./SimulationsModule.module.css";

export default function SimulationsModule(props: ModuleProps): JSX.Element {
  return (
    <Module width={props.width} gridArea={props.gridArea}>
      <div className={styles.simulations}>
        <h3>Margin Simulations</h3>
      </div>
    </Module>
  );
}
