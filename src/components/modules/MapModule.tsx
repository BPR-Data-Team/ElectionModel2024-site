import Module, { ModuleProps } from "../Module";
import styles from "./MapModule.module.css";

export default function MapModule(props: ModuleProps): JSX.Element {
  return (
    <Module width={props.width} gridArea={props.gridArea}>
      <div className={styles.map}>Map</div>
    </Module>
  );
}
