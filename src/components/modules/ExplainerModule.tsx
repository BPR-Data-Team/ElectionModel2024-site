import Module, { ModuleProps } from "../Module";
import styles from "./ExplainerModule.module.css";

export default function ExplainerModule(props: ModuleProps): JSX.Element {
  return (
    <Module width={props.width} gridArea={props.gridArea}>
      <div className={styles.explainer}>
        <h2>How 24cast Predicted This Race</h2>
        <p>This is the explainer module. It explains things.</p>
      </div>
    </Module>
  );
}
