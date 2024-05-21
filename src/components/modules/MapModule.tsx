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
    value: parseFloat(parseFloat(apiResponse.avg_margin.S).toFixed(1)),
    "hc-key": "us-" + apiResponse.state.S.toLowerCase(),
  };
}

async function fetchMapData(race: string): Promise<StateData[]> {
  return fetch(
    `https://tr4evtbsi2.execute-api.us-east-1.amazonaws.com/Deployment/DynamoDBManager?race=${race}`
  )
    .then((response) => response.json())
    .then((data) => {
      var result: StateData[] = [];
      var items = data["Responses"]["BPR_Data_Model"];
      for (var i = 0; i < items.length; i++) {
        result.push(parseMapItem(items[i]));
      }
      return result;
    })
    .catch((error) => {
      throw new Error("Failed to fetch API");
    });
}

interface MapProps {
  raceType: RaceType;
  setState: (state: State) => void;
  setDistrict: (district: number) => void;
}

const MapModule: React.FC<MapProps> = (props: MapProps) => {
  const [mapData, setMapData] = useState<StateData[]>([]);
  const [USPresidentMapData, setUSPresidentMapData] = useState<StateData[]>([]); // cache map data
  const [USSenateMapData, setUSSenateMapData] = useState<StateData[]>([]); // cache map data
  const [USGovernorMapData, setUSGovernorMapData] = useState<StateData[]>([]); // cache map data
  useEffect(() => {
    try {
      let type = "USPresident";
      if (props.raceType == RaceType.Senate) {
        type = "USSenate";
      } else if (props.raceType == RaceType.Gubernatorial) {
        type = "USGovernor";
      }
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
    } catch (error) {
      console.error(error);
    }
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
        <h3>
          24cast.org's Prediction Map:
        </h3>
        <p>
          {props.raceType === RaceType.House ? "Hover over a state to see more information." : "Hover over a state or click to see more information."}
        </p>  
        <MapChart stateData={mapData} onStateClick={handleStateClick} />
      </div>
    </Module>
  );
}

export default MapModule;