import { useEffect, useState } from "react";
import DownloadThisCard from "../DownloadThisCard";
import Module from "../Module";
import styles from "./ExplainerModule.module.css";
import { Party } from "@/types/Party";
import { SHAPFactor } from "@/types/SHAPFactor";
import SHAPDonut from "@/dataviz/SHAPDonut";

export interface ExplainerModuleProps {
  winner: Party;
  numSimulations: number;
  numWins: number;
  numLosses: number;
  SHAPFactors: Record<SHAPFactor, number> | undefined;
}

export default function ExplainerModule(
  props: ExplainerModuleProps
): JSX.Element {
  const [mostPredictiveFactors, setMostPredictiveFactors] = useState<
    SHAPFactor[]
  >([]);

  const formatStringList = (strings: string[]): React.JSX.Element | null => {
    if (strings.length === 0) return null; // No strings in the array
    // Map each string to a span element
    const spans: React.JSX.Element[] = strings.map((string, index) => (
      <span key={index} className={styles.boldText}>
        {string}
      </span>
    ));
    if (strings.length === 1) return spans[0]; // Single item
    // For multiple items, format them with commas and "and"
    return (
      <>
        {spans.reduce<React.ReactNode[]>((acc, elem, index, arr) => {
          if (index === 0) {
            return [elem]; // Just add the first element
          } else if (index === arr.length - 1) {
            // Last element, use 'and' with Oxford comma if needed
            const oxfordComma =
              arr.length > 2 ? (
                <span key="comma-and">, and </span>
              ) : (
                <span key="and"> and </span>
              );
            return [...acc, oxfordComma, elem];
          } else {
            // Middle elements, append ', '
            return [...acc, <span key={`comma-${index}`}>, </span>, elem];
          }
        }, [])}
      </>
    );
  };

  useEffect(() => {
    // Get the three highest SHAP factors
    if (props.SHAPFactors === undefined) {
      setMostPredictiveFactors([]);
      return;
    }
    setMostPredictiveFactors(
      Object.entries(props.SHAPFactors)
        .sort((a, b) => b[1] - a[1]) // Sort by value in descending order
        .slice(0, 3) // Get the top 3
        .map(([factor]) => factor as SHAPFactor) // Get the factor name
    );
  }, [props.SHAPFactors]);

  return (
    <Module>
      <div className={styles.explainer}>
        <h3>How 24cast.org Predicted This Race</h3>
        <p>
          We ran <span className={styles.boldText}>{props.numSimulations}</span>{" "}
          simulations predicting election margins using a machine learning model
          trained on data across multiple decades.
        </p>
        <p>
          {props.winner}s won in{" "}
          <span className={styles.boldText}>{props.numWins}</span> simulations
          and lost <span className={styles.boldText}>{props.numLosses}</span>.
        </p>
        {mostPredictiveFactors.length > 0 && (
          <p>
            By running simulations with varied input data, we determined that{" "}
            {formatStringList(mostPredictiveFactors)}{" "}
            {mostPredictiveFactors.length > 1 ? "were" : "was"} the most
            predictive factors in this race.
          </p>
        )}
        {mostPredictiveFactors.length === 0 && (
          <p>
            Unfortunately, we were unable to determine the most predictive
            factors for this race.
          </p>
        )}
        <p>
          <a href="/soon" className={styles.methodologyLink}>
            Look through our full methodology!
          </a>
        </p>
        {/* <SHAPDonut SHAPFactors={props.SHAPFactors} /> */}
        <DownloadThisCard />
      </div>
    </Module>
  );
}
