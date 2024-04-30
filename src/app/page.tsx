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

interface RaceData {
  winner: Party;
  likelihood: number;
  margin: number;
}

interface StringValue {
  S: string;
}

interface ApiResponse {
  margins: StringValue;
  expert_ratings: StringValue;
  rep_name: StringValue;
  dem_name: StringValue;
  poll: StringValue;
  voting_regulations: StringValue;
  avg_margin: StringValue;
  consumer_confidence_index: StringValue;
  other: StringValue;
  ind_name: StringValue;
  campaign_finance: StringValue;
  unemployment_and_inflation: StringValue;
  state_district_office: StringValue;
  demographics: StringValue;
  composition_of_congress_and_presidency: StringValue;
  weird: StringValue;
  gas_prices: StringValue;
  past_elections: StringValue;
}

interface ConvertedApiResponse {
  margins: number[];
  expert_ratings: number;
  rep_name: string;
  dem_name: string;
  poll: number;
  voting_regulations: number;
  avg_margin: number;
  consumer_confidence_index: number;
  other: number;
  ind_name: string;
  campaign_finance: number;
  unemployment_and_inflation: number;
  state_district_office: string;
  demographics: number;
  composition_of_congress_and_presidency: number;
  weird: string;
  gas_prices: number;
  past_elections: number;
}

function convertApiResponse(response: ApiResponse): ConvertedApiResponse {
  return {
    margins: JSON.parse(response.margins.S),
    expert_ratings: parseFloat(response.expert_ratings.S),
    rep_name: response.rep_name.S,
    dem_name: response.dem_name.S,
    poll: parseFloat(response.poll.S),
    voting_regulations: parseFloat(response.voting_regulations.S),
    avg_margin: parseFloat(response.avg_margin.S),
    consumer_confidence_index: parseFloat(response.consumer_confidence_index.S),
    other: parseFloat(response.other.S),
    ind_name: response.ind_name.S,
    campaign_finance: parseFloat(response.campaign_finance.S),
    unemployment_and_inflation: parseFloat(
      response.unemployment_and_inflation.S
    ),
    state_district_office: response.state_district_office.S,
    demographics: parseFloat(response.demographics.S),
    composition_of_congress_and_presidency: parseFloat(
      response.composition_of_congress_and_presidency.S
    ),
    weird: response.weird.S,
    gas_prices: parseFloat(response.gas_prices.S),
    past_elections: parseFloat(response.past_elections.S),
  };
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
      const item: ApiResponse = data.Item;
      const results: ConvertedApiResponse = convertApiResponse(item);
      console.log(results);
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
      <Footer />
    </main>
  );
}
