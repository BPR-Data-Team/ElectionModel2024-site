import Module, { ModuleProps } from "../Module";
import styles from "./HistoricalModule.module.css";

export default function HistoricalModule(props: ModuleProps): JSX.Element {
  return (
    <Module width={props.width} gridArea={props.gridArea}>
      <div className={styles.historical}>
        <h3>Historical Predictions</h3>
        <p>This module is not used (yet)</p>
      </div>
    </Module>
  );
}
