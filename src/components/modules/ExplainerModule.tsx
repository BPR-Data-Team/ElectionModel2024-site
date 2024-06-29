import { useEffect, useState } from "react";
import DownloadThisCard from "../DownloadThisCard";
import Module from "../Module";
import styles from "./ExplainerModule.module.css";
import { Party } from "@/types/Party";
import { SHAPFactor } from "@/types/SHAPFactor";
import { RaceType } from "@/types/RaceType";
import DonutChart from "@/components/dataviz/SHAPDonut";
import { formatNumber } from "@/utils";
import Image from "next/image";
import NoDonut from "image-assets/donut.svg"

export interface ExplainerModuleProps {
  winner: Party;
  raceType: RaceType
  numDemWins: number;
  numRepWins: number;
  numTies: number;
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
        .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1])) // Sort by value in descending order
        .slice(0, 3) // Get the top 3
        .map(([factor]) => factor as SHAPFactor) // Get the factor name
    );
  }, [props.SHAPFactors]);

  return (
    <Module>
      <div className={styles.explainer}>
        <h3>How 24cast.org Predicted This Race</h3>
        <p>
          We ran{" "}
          <span className={styles.boldText}>
            {formatNumber(props.numDemWins + props.numRepWins + props.numTies)}
          </span>{" "}
          simulations predicting election margins using a machine learning model
          trained on data across multiple decades.
        </p>
        {props.winner === "Tie" ? (
          <p>
            <span className={styles.boldText}>
              {formatNumber(props.numTies)}
            </span>{" "}
            simulations ended in a tie. Democrats won in{" "}
            <span className={styles.boldText}>
              {formatNumber(props.numDemWins)}
            </span>
            , and Republicans won in{" "}
            <span className={styles.boldText}>
              {formatNumber(props.numRepWins)}
            </span>
            .
          </p>
        ) : props.winner === "Democrat" ? (
          <p>
            Democrats won in{" "}
            <span className={styles.boldText}>
              {formatNumber(props.numDemWins)}
            </span>{" "}
            simulations
            {props.numTies > 0 ? (
              <>
                , Republicans won in{" "}
                <span className={styles.boldText}>
                  {formatNumber(props.numRepWins)}
                </span>{" "}
                simulations, and the race was tied in{" "}
                <span className={styles.boldText}>
                  {formatNumber(props.numTies)}
                </span>{" "}
                simulations.
              </>
            ) : (
              <>
                {" "}
                and lost in{" "}
                <span className={styles.boldText}>
                  {formatNumber(props.numRepWins)}
                </span>{" "}
                simulations.
              </>
            )}
          </p>
        ) : (
          <p>
            Republicans won in{" "}
            <span className={styles.boldText}>
              {formatNumber(props.numRepWins)}
            </span>{" "}
            simulations
            {props.numTies > 0 ? (
              <>
                , Democrats won in{" "}
                <span className={styles.boldText}>
                  {formatNumber(props.numDemWins)}
                </span>{" "}
                simulations, and the race was tied in{" "}
                <span className={styles.boldText}>
                  {formatNumber(props.numTies)}
                </span>{" "}
                simulations.
              </>
            ) : (
              <>
                {" "}
                and lost in{" "}
                <span className={styles.boldText}>
                  {formatNumber(props.numDemWins)}
                </span>{" "}
                simulations.
              </>
            )}
          </p>
        )}
        {mostPredictiveFactors.length > 0 && (
          <p className={styles.noBottom}>
            By running simulations with varied input data, we determined that{" "}
            {formatStringList(mostPredictiveFactors)}{" "}
            {mostPredictiveFactors.length > 1 ? "were" : "was"} the most
            predictive factors in this race.
          </p>
        )}
        {mostPredictiveFactors.length === 0 && <p></p>}
        {mostPredictiveFactors.length > 0 && props.raceType != RaceType.House && (
          <div className={styles.donut}><DonutChart SHAPFactors={props.SHAPFactors} /></div>)}
        {mostPredictiveFactors.length == 0 && props.raceType != RaceType.House && (
          <div className={styles.Nodonut}>
            <Image src={NoDonut} alt="Placeholder Donut Chart" width={90}></Image>
            <p>Select a state to see more information</p>
            </div>)}
        <p className={styles.noTop}>
          <a href="/methodology" className={styles.methodologyLink}>
            Look through our full methodology!
          </a>
        </p>
        <DownloadThisCard />
      </div>
    </Module>
  );
}
