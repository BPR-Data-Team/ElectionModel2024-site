import Module, { ModuleProps } from "../Module";
import styles from "./KeyRacesModule.module.css";

export default function KeyRacesModule(props: ModuleProps): JSX.Element {
  return (
    <Module width={props.width} gridArea={props.gridArea}>
      <div className={styles.keyraces}>Key Races</div>
    </Module>
  );
}
