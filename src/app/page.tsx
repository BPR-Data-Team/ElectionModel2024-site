"use client";
import PredictionModule from "@/components/modules/PredictionModule";
import styles from "./page.module.css";
import WelcomeModule from "@/components/modules/WelcomeModule";
import MapModule from "@/components/modules/MapModule";
import SimulationsModule from "@/components/modules/SimulationsModule";
import ExplainerModule from "@/components/modules/ExplainerModule";
import SHAPModule from "@/components/modules/SHAPModule";
import KeyRacesModule from "@/components/modules/KeyRacesModule";
import SearchModule from "@/components/modules/SearchModule";
import { useState } from "react";

/**
 * The home page. This is the main page of the site, and is the first page that users see when they visit the site.
 * @returns {JSX.Element} The home page.
 */
export default function Home(): JSX.Element {
  const [raceType, setRaceType] = useState<String>("presidential");
  const [state, setState] = useState<String>("national");
  const [winner, setWinner] = useState<String>("democrat");
  const [likelihood, setLikelihood] = useState<number>(0.5);
  const [margin, setMargin] = useState<number>(0.5);
  return (
    <main className={styles.main}>
      <WelcomeModule />
      <SearchModule />
      <PredictionModule />
      <div className={styles.mapAndSims}>
        <MapModule />
        <SimulationsModule />
      </div>
      <ExplainerModule />
      <SHAPModule />
      <KeyRacesModule />
    </main>
  );
}
