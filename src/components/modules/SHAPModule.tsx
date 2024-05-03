import { SHAPFactor } from "@/types/SHAPFactor";
import Module from "../Module";
import styles from "./SHAPModule.module.css";

export interface SHAPModuleProps {
  SHAPPredictions: Record<SHAPFactor, number> | undefined;
}

export default function SHAPModule(props: SHAPModuleProps): JSX.Element {
  return (
    <Module>
      <div className={styles.shap}>
        <h3>This Race&apos;s Most Predictive Factors</h3>
        Displaying{" "}
        {props.SHAPPredictions == undefined
          ? "0"
          : Object.keys(props.SHAPPredictions).length}{" "}
        factors
      </div>
    </Module>
  );
}
