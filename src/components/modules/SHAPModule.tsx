import Module from "../Module";
import styles from "./SHAPModule.module.css";

export default function SHAPModule(): JSX.Element {
  return (
    <Module>
      <div className={styles.shap}>
        <h3>This Race&apos;s Most Predictive Factors</h3>
      </div>
    </Module>
  );
}
