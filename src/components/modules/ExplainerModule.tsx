import DownloadThisCard from "../DownloadThisCard";
import Module, { ModuleProps } from "../Module";
import styles from "./ExplainerModule.module.css";

export default function ExplainerModule(props: ModuleProps): JSX.Element {
  return (
    <Module width={props.width} gridArea={props.gridArea}>
      <div className={styles.explainer}>
        <h2>How 24cast Predicted This Race</h2>
        <p>
          We ran <b>10,000</b> simulations predicting election margins using a
          machine learning model trained on data across multiple decades.
        </p>
        <p>
          Democrats won in <b>1173</b> simulations and lost 3456.
        </p>
        <p>
          By running simulations with varied input data, we determined that{" "}
          <b>economic metrics</b>, <b>polling</b>, and <b>incumbency</b> were
          the most predictive factors in this race.
        </p>
        <p>
          <a href="#" className={styles.methodologyLink}>
            Look through our full methodology!
          </a>
        </p>
        <DownloadThisCard />
      </div>
    </Module>
  );
}
