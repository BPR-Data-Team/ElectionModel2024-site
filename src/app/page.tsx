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
import { RaceType } from "@/types/RaceType";
import { State } from "@/types/State";
import { Party } from "@/types/Party";

/**
 * The home page. This is the main page of the site, and is the first page that users see when they visit the site.
 * @returns {JSX.Element} The home page.
 */
export default function Home(): JSX.Element {
  const [raceType, setRaceType] = useState<RaceType>(RaceType.Governor);
  const [state, setState] = useState<State>(State.Vermont);
  const [winner, setWinner] = useState<Party>(Party.Democrat);
  const [likelihood, setLikelihood] = useState<number>(50);
  const [margin, setMargin] = useState<number>(50);
  return (
    <main className={styles.main}>
      <WelcomeModule />
      <SearchModule
        raceType={raceType}
        state={state}
        setRaceType={setRaceType}
        setState={setState}
      />
      <PredictionModule
        winner={winner}
        likelihood={likelihood}
        margin={margin}
        raceType={raceType}
        state={state}
      />
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
