import { SHAPFactor } from "@/types/SHAPFactor";
import Module from "../Module";
import styles from "./SHAPModule.module.css";
import DonutChart from "@/components/dataviz/SHAPDonut";
import ArrowChart from "@/components/dataviz/ArrowChart";

export interface SHAPModuleProps {
  SHAPPredictions: Record<SHAPFactor, number> | undefined;
}

export default function SHAPModule(props: SHAPModuleProps): JSX.Element {
  return (
    <Module>
      <div className={styles.shap}>
        <h3>This Race&apos;s Most Predictive Factors</h3>
      </div>
      <ArrowChart SHAP={props.SHAPPredictions} />
    </Module>
  );
}
