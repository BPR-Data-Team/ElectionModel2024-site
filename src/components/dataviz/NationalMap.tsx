import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";
import highchartsAccessibility from "highcharts/modules/accessibility";
import { fetchMapData } from "./mapDataCache";

if (typeof window !== `undefined`) {
    highchartsAccessibility(Highcharts);
}

if (typeof Highcharts === "object") {
  HighchartsMap(Highcharts);
}

const colorAxisStops: [number, string][] = [
  [-1, "#B83C2B"], // Republican red
  [1, "#595D9A"], // Democrat blue
];

export interface StateData {
  code: string;
  value: number;
}

interface NationalMapProps {
  stateData: StateData[];
  rank: number;
}

const NationalMap: React.FC<NationalMapProps> = ({ stateData, rank }) => {
  const [mapData, setMapData] = useState<any>(null);

  const stateDataWithColors = stateData.map((state) => {
    return {
      code: state.code,
      value: state.value === 1 ? 1 : -1,
      color: state.value === 1 ? "#595D9A" : "#B83C2B",
    };
  });

  useEffect(() => {
    fetchMapDataAndInitializeMap();
  }, []);

  const fetchMapDataAndInitializeMap = async () => {
    const data = await fetchMapData();
    setMapData(data);
    initializeMap(data);
  };

  const initializeMap = (mapData: any) => {
    const mapOptions: Highcharts.Options = {
      chart: {
        type: "map",
        map: mapData,
        margin: [0, 0, 0, 0],
      },
      plotOptions: {
        series: {
            states: {
                hover: {
                    enabled: false
                }
            }
        }
    },
      credits: {
        enabled: false,
      },
      accessibility: {
        description:
          "Map of the United States showing the average predicted margin by state.",
      },
      title: {
        text: "",
      },
      mapNavigation: {
        enabled: false,
        enableButtons: false,
      },
      colorAxis: {
        min: -1,
        max: 1,
        stops: colorAxisStops,
        visible: false,
      },
      legend: {
        itemStyle: {
          fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
        },
      },
      tooltip: {
        enabled: false,
      },
      series: [
        {
          type: "map",
          data: stateDataWithColors,
          mapData: mapData,
          joinBy: ["hc-key", "code"],
        },
      ],
    };
    Highcharts.mapChart("container" + rank * 5, mapOptions);
  };

  return <div id={"container" + rank * 5} />;
};

export default NationalMap;
