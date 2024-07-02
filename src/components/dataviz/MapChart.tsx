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

export interface StateData {
  "hc-key": string;
  value: number;
}

interface MapProps {
  stateData: StateData[];
  onStateClick: (hcKey: string) => void;
}

const colorAxisStops: [number, string][] = [
  [0, "#B83C2B"], // Republican red
  [0.38, "#B83C2B"],
  [0.47, "#EAEAEA"],
  [0.53, "#EAEAEA"],
  [0.62, "#595D9A"],
  [1, "#595D9A"], // Democrat blue
];

const MapChart: React.FC<MapProps> = (props: MapProps) => {
  const [mapData, setMapData] = useState<any>(null);

  useEffect(() => {
    if (props.stateData.length > 0)
      fetchMapDataAndInitializeMap(props.stateData);
  }, [props.stateData]);

  const fetchMapDataAndInitializeMap = async (stateData: StateData[]) => {
    const data = await fetchMapData();
    setMapData(data);
    initializeMap(stateData, data);
  };

  function getMaxState(stateData: StateData[]): number {
    console.log("The maximumum state is" + Math.max(...stateData.map((state) => state.value)))
    return Math.max(...stateData.map((state) => state.value));
  }

  function getMinState(stateData: StateData[]): number {
    console.log("The minimum state is" + Math.min(...stateData.map((state) => state.value)))
    return Math.min(...stateData.map((state) => state.value));
  }

  const initializeMap = (stateData: StateData[], mapData: any) => {
    const axisMax: number = Math.max(
      Math.abs(getMinState(stateData)),
      Math.abs(getMaxState(stateData))
    );
    const colorAxis: Highcharts.ColorAxisOptions = {
      min: -axisMax,
      max: axisMax,
      stops: colorAxisStops,
      visible: false,
    };
    const mapOptions: Highcharts.Options = {
      chart: {
        type: "map",
        map: mapData,
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
      colorAxis: colorAxis,
      tooltip: {
        formatter: function (this: any) {
          let prefix = this.point.value >= 0 ? "D " : "R ";
          return (
            "<b>" +
            this.point.name +
            "</b><br/>" +
            prefix +
            "+" +
            Math.abs(this.point.value)
          );
        },
        style: {
          fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
        },
      },
      legend: {
        itemStyle: {
          fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
        },
      },
      series: [
        {
          type: "map",
          data: stateData,
          name: "Predicted Margin",
          states: {},
          dataLabels: {
            format: "{point.name}",
            style: {
              fontFamily:
                "gelica, book antiqua, georgia, times new roman, serif",
            },
          },
          events: {
            click: function (event: any) {
              props.onStateClick(event.point["hc-key"]);
            },
          },
        },
      ],
    };
    Highcharts.mapChart("container", mapOptions);
  };

  return <div id="container" />;
};

export default MapChart;
