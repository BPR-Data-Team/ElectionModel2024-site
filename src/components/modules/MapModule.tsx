import Module, { ModuleProps } from "../Module";
import styles from "./MapModule.module.css";

export default function MapModule(props: ModuleProps): JSX.Element {
  return (
    <Module width={props.width} gridArea={props.gridArea}>
      <div className={styles.map}>
        <h3>24cast Prediction Map:</h3>
        <p>
          The map shows the results of the 2024 election. The Whigs won in a
          landslide victory, securing 90% of the electoral votes.
        </p>
      </div>
    </Module>
  );
}
