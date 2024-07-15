import { useEffect, useState } from "react";
import Module from "../Module";
import styles from "./MapModule.module.css";
import MapChart, { StateData } from "@/components/dataviz/MapChart";
import { RaceType } from "@/types/RaceType";
import { State, getStateFromAbbreviation } from "@/types/State";

interface MapItemJSON {
  avg_margin: { S: string };
  state: { S: string };
}

function parseMapItem(apiResponse: MapItemJSON): StateData {
  return {
    value: (parseFloat(apiResponse.avg_margin.S)),
    "hc-key": "us-" + apiResponse.state.S.toLowerCase(),
  };
}

async function fetchMapData(
  race: string,
  retries: number = 3
): Promise<StateData[]> {
  const fetchMapData = async (): Promise<StateData[]> => {
    const response = await fetch(
      `https://tr4evtbsi2.execute-api.us-east-1.amazonaws.com/Deployment/DynamoDBManager?race=${race}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch API, server responded with status code ${response.status}`
      );
    }
    const data = await response.json();
    const result: StateData[] = [];
    const items = data["Responses"]["BPR_Data_Model"];
    for (let i = 0; i < items.length; i++) {
      let item = parseMapItem(items[i]);
      if (!isNaN(item.value)) {
        result.push(item);
      }
    }
    return result;
  };

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fetchMapData();
    } catch (error) {
      if (attempt < retries - 1) {
        console.warn(`Attempt ${attempt + 1} failed. Retrying...`);
      } else {
        console.error("All attempts failed.");
        throw new Error("Failed to fetch data after all retries.");
      }
    }
  }
  throw new Error("Failed to fetch data after all retries.");
}

interface mapProps {
  raceType: RaceType;
  setState: (state: State) => void;
  setDistrict: (district: number) => void;
}

export default function MapModule(props: mapProps): JSX.Element {
  const [mapData, setMapData] = useState<StateData[]>([]);
  const [USPresidentMapData, setUSPresidentMapData] = useState<StateData[]>([]); // cache map data
  const [USSenateMapData, setUSSenateMapData] = useState<StateData[]>([]); // cache map data
  const [USGovernorMapData, setUSGovernorMapData] = useState<StateData[]>([]); // cache map data
  useEffect(() => {
    if (props.raceType == RaceType.Unset) return;
    let active = true;
    try {
      let type = "USPresident";
      if (props.raceType == RaceType.Senate) {
        type = "USSenate";
      } else if (props.raceType == RaceType.Gubernatorial) {
        type = "USGovernor";
      }
      if (active) {
        if (type == "USPresident" && USPresidentMapData.length > 0) {
          setMapData(USPresidentMapData);
          return;
        }
        if (type == "USSenate" && USSenateMapData.length > 0) {
          setMapData(USSenateMapData);
          return;
        }
        if (type == "USGovernor" && USGovernorMapData.length > 0) {
          setMapData(USGovernorMapData);
          return;
        }
        fetchMapData(type).then((data: StateData[]) => {
          if (type == "USPresident") {
            setUSPresidentMapData(data);
          } else if (type == "USSenate") {
            setUSSenateMapData(data);
          } else if (type == "USGovernor") {
            setUSGovernorMapData(data);
          }
          setMapData(data);
        });
      }
    } catch (error) {
      console.error(error);
    }
    return () => {
      active = false;
    };
  }, [props.raceType]);

  const handleStateClick = (hcKey: string) => {
    const stateAbbrev = hcKey.replace("us-", "").toUpperCase();
    const state = getStateFromAbbreviation(stateAbbrev);
    props.setState(state);
    props.setDistrict(0); // default value for district
  };

  return (
    <Module className="mapModule">
      <div className={styles.map}>
        <h3>24cast.org&apos;s Prediction Map:</h3>
        <p>Click on a state to switch views.</p>
        <MapChart stateData={mapData} onStateClick={handleStateClick} />
      </div>
    </Module>
  );
}
