import Module, { ModuleProps } from "../Module";
import styles from "./HistoricalModule.module.css";

export default function HistoricalModule(props: ModuleProps): JSX.Element {
  return (
    <Module width={props.width} gridArea={props.gridArea}>
      <div className={styles.historical}>
        <h3>24casts Prediction Over Time</h3>
        <p>To be removed?</p>
      </div>
    </Module>
  );
}
