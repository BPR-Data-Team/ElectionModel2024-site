import Module, { ModuleProps } from "../Module";
import styles from "./HistoricalModule.module.css";

export default function HistoricalModule(props: ModuleProps): JSX.Element {
  return (
    <Module width={props.width} gridArea={props.gridArea}>
      <div className={styles.historical}>
        <h2>Historical</h2>
        <p>This is the historical module. It shows historical predictions.</p>
      </div>
    </Module>
  );
}
