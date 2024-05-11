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
import { ResponseItem, parseItem } from "@/types/APIResponse";
import { SHAPFactor } from "@/types/SHAPFactor";
import ReactGA from "react-ga4";

const TRACKING_ID = "G-QDEM59MHXZ";
ReactGA.initialize(TRACKING_ID);

interface RaceData {
  winner: Party;
  likelihood: number;
  margin: number;
  SHAPFactors: Record<SHAPFactor, number>;
  simulations: number[];
  weird?: string;
}

function calculateLikelihood(
  avg_margin: number,
  margins: number[],
  deciding_margin: number
): number {
  const winner: Party =
    avg_margin > deciding_margin ? Party.Democrat : Party.Republican;

  // if dem, count number of margins above deciding_margin
  // if rep, count number of margins below deciding_margin
  const matchingWinnerCount = margins.reduce((count, margin) => {
    return (
      count +
      (winner === Party.Democrat
        ? margin > deciding_margin
          ? 1
          : 0
        : margin < deciding_margin
        ? 1
        : 0)
    );
  }, 0);

  if (margins.length === 0) return 0; // Prevent division by zero
  return Math.round((matchingWinnerCount / margins.length) * 100);
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
    (raceType !== RaceType.House || state === State.National) &&
    !(
      raceType === RaceType.Presidential &&
      (state === State.Maine || state === State.Nebraska)
    ) // Maine and Nebraska have individual electors + at-large for presidential elections
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
  return fetch(fetchInput)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const responseItem: ResponseItem = parseItem(data);
      if (responseItem.weird) {
        return {
          winner: Party.Democrat,
          likelihood: 0,
          margin: 0,
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
          simulations: [],
          weird: responseItem.weird,
        };
      }
      let winner: Party =
        responseItem.avg_margin > 0 ? Party.Democrat : Party.Republican;
      let likelihood: number = calculateLikelihood(
        responseItem.avg_margin,
        responseItem.margins,
        0
      );
      if (state === State.National) {
        switch (raceType) {
          case RaceType.Presidential:
            winner =
              responseItem.avg_margin > 269
                ? Party.Democrat
                : responseItem.avg_margin < 269
                ? Party.Republican
                : Party.Tie;
            likelihood = calculateLikelihood(
              responseItem.avg_margin,
              responseItem.margins,
              269
            );
            break;
          case RaceType.Senate:
            winner =
              responseItem.avg_margin > 50
                ? Party.Democrat
                : responseItem.avg_margin < 50
                ? Party.Republican
                : Party.Tie;
            likelihood = calculateLikelihood(
              responseItem.avg_margin,
              responseItem.margins,
              50
            );
            break;
          case RaceType.House:
            winner =
              responseItem.avg_margin > 218 ? Party.Democrat : Party.Republican;
            likelihood = calculateLikelihood(
              responseItem.avg_margin,
              responseItem.margins,
              218
            );
            break;
          default:
            break;
        }
      }
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
        SHAPFactors: SHAPFactors,
        simulations: responseItem.margins,
      };
      return predictions;
    })
    .catch((error: Error) => {
      return Promise.reject(error);
    });
}

/**
 * The home page. This is the main page of the site, and is the first page that users see when they visit the site.
 * @returns {JSX.Element} The home page.
 */
export default function Home(): JSX.Element {
  const [raceType, setRaceType] = useState<RaceType>(RaceType.Presidential);
  const [state, setState] = useState<State>(State.National);
  const [district, setDistrict] = useState<number>(0);
  const [winner, setWinner] = useState<Party>(Party.Democrat);
  const [likelihood, setLikelihood] = useState<number>(0);
  const [margin, setMargin] = useState<number>(0);
  const [SHAPFactors, setSHAPFactors] = useState<Record<SHAPFactor, number>>();
  const [simulations, setSimulations] = useState<number[]>([]);
  const [decidingMargin, setDecidingMargin] = useState<number>(0);
  const [weird, setWeird] = useState<string>("");

  useEffect(() => {
    try {
      fetchRaceData(raceType, state, district).then((data: RaceData) => {
        setWinner(data.winner);
        setLikelihood(data.likelihood);
        setMargin(data.margin);
        setSHAPFactors(data.SHAPFactors);
        setSimulations(data.simulations);
        if (data.weird) {
          setWeird(data.weird);
        } else {
          setWeird("");
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, [raceType, state, district]);

  useEffect(() => {
    if (state === State.National) {
      switch (raceType) {
        case RaceType.Presidential:
          setDecidingMargin(269);
          break;
        case RaceType.Senate:
          setDecidingMargin(50);
          break;
        case RaceType.House:
          setDecidingMargin(218);
          break;
        default:
          setDecidingMargin(0);
          break;
      }
    } else {
      setDecidingMargin(0);
    }
  }, [raceType, state]);

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
      />
      {weird === "" && (
        <div className={styles.mapAndSims}>
          <MapModule type={raceType} />
          <ExplainerModule
            winner={winner}
            numSimulations={simulations.length}
            numWins={
              winner === Party.Democrat
                ? simulations.filter((sim) => sim > decidingMargin).length
                : simulations.filter((sim) => sim < decidingMargin).length
            }
            numLosses={
              winner === Party.Democrat
                ? simulations.filter((sim) => sim < decidingMargin).length
                : simulations.filter((sim) => sim > decidingMargin).length
            }
            SHAPFactors={
              state === State.National
              ? undefined
              : SHAPFactors
            }
          />
        </div>
      )}
      {weird === "" && (
        <SimulationsModule
          simulations={simulations}
          raceType={raceType}
          state={state}
          winner={winner}
        />
      )}
      {weird === "" && state !== State.National && (
        <SHAPModule SHAPPredictions={SHAPFactors} />
      )}
      {weird === "" && (
        <KeyRacesModule
          raceType={raceType}
          state={state}
          district={district}
          setRaceType={setRaceType}
          setState={setState}
          setDistrict={setDistrict}
        />
      )}
    </main>
  );
}
