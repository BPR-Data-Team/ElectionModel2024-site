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
import { use, useEffect, useState } from "react";
import { RaceType } from "@/types/RaceType";
import { State, getStateAbbreviation } from "@/types/State";
import { Party } from "@/types/Party";

interface RaceData {
  winner: Party;
  likelihood: number;
  margin: number;
}

async function fetchRaceData(
  raceType: RaceType,
  state: State,
  district: number
): Promise<RaceData> {
  const stateArg: string = getStateAbbreviation(state);
  const districtArg: string =
    raceType !== RaceType.House || state === State.National
      ? "0"
      : district.toString();
  let raceTypeArg = "";
  switch (raceType) {
    case RaceType.gubernational:
      raceTypeArg = "Governor";
      break;
    case RaceType.House:
      raceTypeArg = "House";
      break;
    case RaceType.Senate:
      raceTypeArg = "Senate";
      break;
    case RaceType.presidential:
      raceTypeArg = "President";
      break;
  }
  const raceArg = `${stateArg}${districtArg}${raceTypeArg}`;

  fetch(
    `https://tr4evtbsi2.execute-api.us-east-1.amazonaws.com/Deployment/DynamoDBManager?race=${raceArg}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Failed to fetch API", error);
    });

  return {
    winner: Party.Democrat,
    likelihood: 70,
    margin: 70,
  };
}

/**
 * The home page. This is the main page of the site, and is the first page that users see when they visit the site.
 * @returns {JSX.Element} The home page.
 */
export default function Home(): JSX.Element {
  const [raceType, setRaceType] = useState<RaceType>(RaceType.gubernational);
  const [state, setState] = useState<State>(State.Vermont);
  const [district, setDistrict] = useState<number>(0);
  const [winner, setWinner] = useState<Party>(Party.Democrat);
  const [likelihood, setLikelihood] = useState<number>(50);
  const [margin, setMargin] = useState<number>(50);

  useEffect(() => {
    fetchRaceData(raceType, state, district).then((data: RaceData) => {
      setWinner(data.winner);
      setLikelihood(data.likelihood);
      setMargin(data.margin);
    });
  }, [raceType, state, district]);

  return (
    <main className={styles.main}>
      <WelcomeModule />
      <div className={styles.stickySearch}>
        <SearchModule
          raceType={raceType}
          state={state}
          district={district}
          setRaceType={setRaceType}
          setState={setState}
          setDistrict={setDistrict}
        />
      </div>
      <PredictionModule
        winner={winner}
        likelihood={likelihood}
        margin={margin}
        raceType={raceType}
        state={state}
        district={district}
      />
      <div className={styles.mapAndSims}>
        <MapModule />
        <ExplainerModule />
      </div>
      <SimulationsModule />
      <SHAPModule />
      <KeyRacesModule />
    </main>
  );
}
