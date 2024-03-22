import Module, { ModuleProps } from "../Module";
import styles from "./PredictionModule.module.css";

export default function PredictionModule(props: ModuleProps): JSX.Element {
  return (
    <Module width={props.width} gridArea={props.gridArea}>
      <div className={styles.prediction}>
        <h2>Prediction</h2>
        <p>
          Based on the data we have, we predict that the next election will be a
          landslide victory for the Whigs.
        </p>
      </div>
    </Module>
  );
}
