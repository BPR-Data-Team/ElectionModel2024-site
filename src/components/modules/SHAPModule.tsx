import Module, { ModuleProps } from "../Module";
import styles from "./SHAPModule.module.css";

export default function SHAPModule(props: ModuleProps): JSX.Element {
  return (
    <Module width={props.width} gridArea={props.gridArea}>
      <div className={styles.shap}>
        <h2>SHAP</h2>
        <p>
          SHAP is a method to explain the output of any machine learning model.
          It connects game theory with local explanations, uniting several
          previous methods and representing the only possible consistent and
          locally accurate additive feature attribution method based on
          expectations.
        </p>
      </div>
    </Module>
  );
}
