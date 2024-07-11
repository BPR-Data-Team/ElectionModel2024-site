"use client";
import PredictionModule from "@/components/modules/PredictionModule";
import styles from "./page.module.css";
import WelcomeModule from "@/components/modules/WelcomeModule";
import MapModule from "@/components/modules/MapModule";
import SimulationsModule from "@/components/modules/SimulationsModule";
import ExplainerModule from "@/components/modules/ExplainerModule";
import NationalMapModule from "@/components/modules/NationalMapModule";
import SHAPModule from "@/components/modules/SHAPModule";
import KeyRacesModule from "@/components/modules/KeyRacesModule";
import SearchModule from "@/components/modules/SearchModule";
import { useEffect, useState } from "react";
import { RaceType } from "@/types/RaceType";
import {
  State,
  getStateAbbreviation,
  getStateFromAbbreviation,
} from "@/types/State";
import { Party } from "@/types/Party";
import { ResponseItem, parseItem } from "@/types/APIResponse";
import { SHAPFactor } from "@/types/SHAPFactor";
import { usePathname, useSearchParams } from "next/navigation";
import ReactGA from "react-ga4";
import { clarity } from "react-microsoft-clarity";

const TRACKING_ID = "G-QDEM59MHXZ";
if (typeof window !== `undefined`) {
  if (process.env.NODE_ENV === "production") ReactGA.initialize(TRACKING_ID);
  if (process.env.NODE_ENV === "production") clarity.init("mlah1s1plh");
}

interface RaceData {
  winner: Party;
  likelihood: number;
  margin: number;
  numDemWins: number;
  numRepWins: number;
  numTies: number;
  SHAPFactors: Record<SHAPFactor, number>;
  binBounds: [number, number];
  binEdges: number[];
  bins: number[];
  weird?: string;
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
  district: number,
  retries: number = 3
): Promise<RaceData> {
  if (raceType == RaceType.Unset) {
    throw new Error("Race type is unset");
  }
  if (typeof state === "string" && state.includes("US-")) {
    let state_abbrev = state.substring(3);
    state = getStateFromAbbreviation(state_abbrev);
  }
  const stateArg: string = getStateAbbreviation(state);
  const districtArg: string =
    (raceType !== RaceType.House || state === State.National) &&
    !(
      raceType === RaceType.Presidential &&
      (state === State.Maine || state === State.Nebraska)
    )
      ? "0"
      : district.toString();
  let raceTypeArg = "";
  switch (raceType) {
    case RaceType.Gubernatorial:
      raceTypeArg = "Governor";
      break;
    case RaceType.House:
      raceTypeArg = "House";
      break;
    case RaceType.Senate:
      raceTypeArg = "Senate";
      break;
    case RaceType.Presidential:
      raceTypeArg = "President";
      break;
  }
  const raceArg: string = `${stateArg}${districtArg}${raceTypeArg}`;
  const fetchInput: string = `https://tr4evtbsi2.execute-api.us-east-1.amazonaws.com/Deployment/DynamoDBManager?race=${raceArg}`;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(fetchInput);
      if (!response.ok) {
        const status_code: number = response.status;
        throw new Error(
          "Failed to fetch API, server responded with status code " +
            status_code
        );
      }
      const data = await response.json();
      const responseItem: ResponseItem = parseItem(data);
      if (responseItem.weird) {
        return {
          winner: Party.Tie,
          likelihood: 0,
          margin: 0,
          numDemWins: 0,
          numRepWins: 0,
          numTies: 0,
          SHAPFactors: {
            [SHAPFactor.ExpertRatings]: 0,
            [SHAPFactor.VotingRegulations]: 0,
            [SHAPFactor.ConsumerConfidenceIndex]: 0,
            [SHAPFactor.Other]: 0,
            [SHAPFactor.CampaignFinance]: 0,
            [SHAPFactor.UnemploymentAndInflation]: 0,
            [SHAPFactor.Demographics]: 0,
            [SHAPFactor.CompositionOfCongressAndPresidency]: 0,
            [SHAPFactor.GasPrices]: 0,
            [SHAPFactor.PastElections]: 0,
            [SHAPFactor.Polls]: 0,
          },
          binBounds: [0, 0] as [number, number],
          binEdges: [],
          bins: [],
          weird: responseItem.weird,
        };
      }
      let winner: Party =
        responseItem.avg_margin > 0 ? Party.Democrat : Party.Republican;
      const numSimulations =
        responseItem.democrat_winning_num +
        responseItem.republican_winning_num +
        responseItem.tie_num;
      if (state === State.National) {
        switch (raceType) {
          case RaceType.Presidential:
            winner =
              responseItem.avg_margin > 269
                ? Party.Democrat
                : responseItem.avg_margin < 269
                ? Party.Republican
                : Party.Tie;
            break;
          case RaceType.Senate:
            winner =
              responseItem.avg_margin > 50
                ? Party.Democrat
                : responseItem.avg_margin < 50
                ? Party.Republican
                : Party.Tie;
            break;
          case RaceType.House:
            winner =
              responseItem.avg_margin > 218 ? Party.Democrat : Party.Republican;
            break;
          default:
            break;
        }
      }
      const likelihood: number = Math.round(
        winner === Party.Tie
          ? (responseItem.tie_num / numSimulations) * 100
          : winner === Party.Democrat
          ? (responseItem.democrat_winning_num / numSimulations) * 100
          : (responseItem.republican_winning_num / numSimulations) * 100
      );
      const margin: number = Math.abs(
        Math.round(responseItem.avg_margin * 10) / 10
      );
      const SHAPFactors: Record<SHAPFactor, number> = {
        [SHAPFactor.PastElections]: responseItem.past_elections,
        [SHAPFactor.Polls]: responseItem.poll,
        [SHAPFactor.ExpertRatings]: responseItem.expert_ratings,
        [SHAPFactor.CampaignFinance]: responseItem.campaign_finance,
        [SHAPFactor.UnemploymentAndInflation]:
          responseItem.unemployment_and_inflation,
        [SHAPFactor.ConsumerConfidenceIndex]:
          responseItem.consumer_confidence_index,
        [SHAPFactor.GasPrices]: responseItem.gas_prices,
        [SHAPFactor.VotingRegulations]: responseItem.voting_regulations,
        [SHAPFactor.CompositionOfCongressAndPresidency]:
          responseItem.composition_of_congress_and_presidency,
        [SHAPFactor.Demographics]: responseItem.demographics,
        [SHAPFactor.Other]: responseItem.other,
      };
      const predictions: RaceData = {
        winner: winner,
        likelihood: likelihood,
        margin: margin,
        numDemWins: responseItem.democrat_winning_num,
        numRepWins: responseItem.republican_winning_num,
        numTies: responseItem.tie_num,
        SHAPFactors: SHAPFactors,
        binBounds: responseItem.bin_bounds,
        binEdges: responseItem.bin_edges,
        bins: responseItem.bins,
      };
      return predictions;
    } catch (error) {
      if (attempt < retries - 1) {
        console.warn(`Attempt ${attempt + 1} failed. Retrying...`);
      } else {
        console.error("All attempts failed.");
        throw error;
      }
    }
  }
  throw new Error("Failed to fetch data after all retries.");
}

/**
 * The home page. This is the main page of the site, and is the first page that users see when they visit the site.
 * @returns {JSX.Element} The home page.
 */
export default function Home(): JSX.Element {
  const [raceType, setRaceType] = useState<RaceType>(RaceType.Unset);
  const [state, setState] = useState<State>(State.National);
  const [district, setDistrict] = useState<number>(0);
  const [winner, setWinner] = useState<Party>(Party.Democrat);
  const [likelihood, setLikelihood] = useState<number>(0);
  const [margin, setMargin] = useState<number>(0);
  const [SHAPFactors, setSHAPFactors] = useState<Record<SHAPFactor, number>>();
  const [numDemWins, setNumDemWins] = useState<number>(0);
  const [numRepWins, setNumRepWins] = useState<number>(0);
  const [numTies, setNumTies] = useState<number>(0);
  const [binBounds, setBinBounds] = useState<[number, number]>([0, 0]);
  const [binEdges, setBinEdges] = useState<number[]>([]);
  const [bins, setBins] = useState<number[]>([]);
  const [weird, setWeird] = useState<string>("");
  const [fetchComplete, setFetchComplete] = useState<boolean>(false);
  const [firstRun, setFirstRun] = useState<boolean>(true);
  useEffect(() => {
    let active = true;
    if (firstRun) {
      if (typeof window !== "undefined") {
        const searchParams = new URLSearchParams(window.location.search);
        if (active) {
          setRaceType(
            (searchParams.get("raceType") as RaceType) ?? RaceType.Presidential
          );
          setState((searchParams.get("state") as State) ?? State.National);
          setDistrict(
            searchParams.get("district")
              ? parseInt(searchParams.get("district") as string)
              : 0
          );
        }
      }
      setFirstRun(false);
    } else {
      if (raceType == RaceType.Unset) return;

      const updateSearchParams = (newParams: { [key: string]: string }) => {
        const newSearchParams = new URLSearchParams(window.location.search);
        Object.entries(newParams).forEach(([key, value]) => {
          if (
            key === "district" && // Only show district param when relevant. The reason we have to handle this here is because the district value isn't changed when the user navigates to a race without a district to increase speed.
            (value === "0" ||
              (raceType !== RaceType.House && // Only House races have districts (except for the Maine and Nebraska presidential handled below)
                !(
                  (
                    raceType === RaceType.Presidential &&
                    (state === State.Maine || state === State.Nebraska)
                  ) // Maine and Nebraska have individual electors + at-large for presidential elections
                )) ||
              state === State.National) // National House race doesn't have a district
          ) {
            newSearchParams.delete("district");
          } else {
            newSearchParams.set(key, value);
          }
        });
        const newUrl = `${
          window.location.pathname
        }?${newSearchParams.toString()}`;
        window.history.pushState({ path: newUrl }, "", newUrl);
      };
      if (active) {
        setFetchComplete(false);
        fetchRaceData(raceType, state, district)
          .then((data: RaceData) => {
            setWinner(data.winner);
            setLikelihood(data.likelihood);
            setMargin(data.margin);
            setNumDemWins(data.numDemWins);
            setNumRepWins(data.numRepWins);
            setNumTies(data.numTies);
            setSHAPFactors(data.SHAPFactors);
            setBinBounds(data.binBounds);
            setBinEdges(data.binEdges);
            setBins(data.bins);
            if (data.weird) {
              setWeird(data.weird);
            } else {
              setWeird("");
            }
            updateSearchParams({
              raceType: raceType,
              state: state,
              district: district.toString(),
            });
            setFetchComplete(true);
          })
          .catch((error: Error) => {
            console.error(error);
          });
      }
    }
    return () => {
      active = false;
    };
  }, [raceType, state, district, firstRun]); // Only run on first render

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
        weird={weird}
        fetchComplete={fetchComplete}
      />
      {weird === "" && (
        <div className={styles.mapAndSims}>
          {raceType !== RaceType.House && (
            <MapModule
              raceType={raceType}
              setState={setState}
              setDistrict={setDistrict}
            />
          )}
          <ExplainerModule
           raceType={raceType}
            winner={winner}
            numDemWins={numDemWins}
            numRepWins={numRepWins}
            numTies={numTies}
            SHAPFactors={state === State.National ? undefined : SHAPFactors}
          />
        </div>
      )}
      {weird === ""  && (
        <SimulationsModule
          binBounds={binBounds}
          binEdges={binEdges}
          bins={bins}
          raceType={raceType}
          state={state}
          winner={winner}
        />
      )}
      {weird === "" && state !== State.National && raceType !== RaceType.House && (
        <SHAPModule SHAPPredictions={SHAPFactors} />
      )}
      <div className={styles.nationalMaps} id="likely-outcomes">
      {state === State.National && raceType === RaceType.Presidential && (
        <NationalMapModule rank={1} probability={17} winner = {"Donald Trump"} winnerEV = {312} />
        )}
      {state === State.National && raceType === RaceType.Presidential && (
      <NationalMapModule rank={2} probability={14} winner = {"Joe Biden"} winnerEV = {287}/>
      )}
      </div>
      {weird === "" && (
        <KeyRacesModule
          setRaceType={setRaceType}
          setState={setState}
          setDistrict={setDistrict}
        />
      )}
    </main>
  );
}
