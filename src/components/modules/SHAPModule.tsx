import { SHAPFactor } from "@/types/SHAPFactor";
import Module from "../Module";
import styles from "./SHAPModule.module.css";
import DonutChart from "@/dataviz/SHAPDonut";
import ArrowChart from "@/dataviz/ArrowChart";
import { State } from "@/types/State";

export interface SHAPModuleProps {
  SHAPPredictions: Record<SHAPFactor, number> | undefined;
  state: State;
}

export default function SHAPModule(props: SHAPModuleProps): JSX.Element {
  return (
    <Module>
      <div className={styles.shap}>
        <h3>This Race&apos;s Most Predictive Factors</h3>
      </div>
      {props.state !== State.National && (
        <ArrowChart SHAP={props.SHAPPredictions} />
      )}
    </Module>
  );
}
