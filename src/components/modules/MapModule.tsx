import Module from "../Module";
import styles from "./MapModule.module.css";

export default function MapModule(): JSX.Element {
  return (
    <Module>
      <div className={styles.map}>
        <h3>24cast.org Prediction Map:</h3>
        <p>Click on a state to see more information.</p>
      </div>
    </Module>
  );
}
