import Module from "../Module";
import styles from "./KeyRacesModule.module.css";

export default function KeyRacesModule(): JSX.Element {
  return (
    <Module>
      <div className={styles.keyraces}>
        <h3>Explore Key Races</h3>
      </div>
    </Module>
  );
}
