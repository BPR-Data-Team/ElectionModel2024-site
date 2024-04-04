import Module, { ModuleProps } from "../Module";
import styles from "./SHAPModule.module.css";

export default function SHAPModule(props: ModuleProps): JSX.Element {
  return (
    <Module width={props.width} gridArea={props.gridArea}>
      <div className={styles.shap}>
        <h3>This Race&apos;s Most Predictive Factors</h3>
      </div>
    </Module>
  );
}
