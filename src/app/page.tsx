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
import Footer from "@/components/Footer";
import { use, useEffect, useState } from "react";
import { RaceType } from "@/types/RaceType";
import { State, getStateAbbreviation } from "@/types/State";
import { Party } from "@/types/Party";
import { ResponseItem, parseItem } from "@/types/APIResponse";
import { SHAPFactor } from "@/types/SHAPFactor";

interface RaceData {
  winner: Party;
  likelihood: number;
  margin: number;
  SHAPFactors: Record<SHAPFactor, number>;
}

function calculateLikelihood(avg_margin: number, margins: number[]): number {
  const avgMarginSign = Math.sign(avg_margin);

  const matchingSignCount = margins.reduce((count, margin) => {
    return count + (Math.sign(margin) === avgMarginSign ? 1 : 0);
  }, 0);

  if (margins.length === 0) return 0; // Prevent division by zero
  return Math.round((matchingSignCount / margins.length) * 100);
}

/**
 *
 * @param raceType The race type
 * @param state The state
 * @param district The district (0 if not applicable)
 * @returns  The predicted winner, likelihood, and margin of the race.
 * @throws {Error} If the API request fails.
 */
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

  return fetch(
    `https://tr4evtbsi2.execute-api.us-east-1.amazonaws.com/Deployment/DynamoDBManager?race=${raceArg}`
  )
    .then((response) => response.json())
    .then((data) => {
      const responseItem: ResponseItem = parseItem(data);
      const winner: Party =
        responseItem.avg_margin > 0 ? Party.Democrat : Party.Republican;
      const likelihood: number = calculateLikelihood(
        responseItem.avg_margin,
        responseItem.margins
      );
      const margin: number = Math.round(responseItem.avg_margin * 10) / 10;
      const SHAPFactors: Record<SHAPFactor, number> = {
        [SHAPFactor.ExpertRatings]: responseItem.expert_ratings,
        [SHAPFactor.VotingRegulations]: responseItem.voting_regulations,
        [SHAPFactor.ConsumerConfidenceIndex]:
          responseItem.consumer_confidence_index,
        [SHAPFactor.Other]: responseItem.other,
        [SHAPFactor.CampaignFinance]: responseItem.campaign_finance,
        [SHAPFactor.UnemploymentAndInflation]:
          responseItem.unemployment_and_inflation,
        [SHAPFactor.Demographics]: responseItem.demographics,
        [SHAPFactor.CompositionOfCongressAndPresidency]:
          responseItem.composition_of_congress_and_presidency,
        [SHAPFactor.GasPrices]: responseItem.gas_prices,
        [SHAPFactor.PastElections]: responseItem.past_elections,
      };
      const predictions: RaceData = {
        winner: winner,
        likelihood: likelihood,
        margin: margin,
        SHAPFactors: SHAPFactors,
      };
      console.log("In fetchRaceData: ", predictions);
      return predictions;
    })
    .catch((error) => {
      throw new Error("Failed to fetch API");
    });
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
  const [SHAPFactors, setSHAPFactors] = useState<Record<SHAPFactor, number>>();

  useEffect(() => {
    try {
      fetchRaceData(raceType, state, district).then((data: RaceData) => {
        console.log("In useEffect: ", data);
        setWinner(data.winner);
        setLikelihood(data.likelihood);
        setMargin(data.margin);
        setSHAPFactors(data.SHAPFactors);
      });
    } catch (error) {
      console.error(error);
    }
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
        <ExplainerModule
          winner={winner}
          numSimulations={1000}
          numWins={700}
          numLosses={300}
          SHAPFactors={SHAPFactors}
        />
      </div>
      <SimulationsModule />
      <SHAPModule />
      <KeyRacesModule />
      <Footer />
    </main>
  );
}
