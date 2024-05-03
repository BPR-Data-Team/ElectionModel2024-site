import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";

if (typeof Highcharts === "object") {
  HighchartsMap(Highcharts);
}

export interface StateData {
  "hc-key": string;
  value: number;
}

interface MapProps {
  stateData: StateData[];
}

const colorAxisStops: [number, string][] = [
  [0, "#B83C2B"], // Republican red
  [0.49999999, "#DB9D95"], // WIP
  [0.5, "#ACAECC"],
  [1, "#595D9A"], // Democrat blue
];

const colorAxis: Highcharts.ColorAxisOptions = {
  min: -3,
  max: 3,
  stops: colorAxisStops,
  visible: false,
};

const MapChart: React.FC<MapProps> = (props: MapProps) => {
  useEffect(() => {
    fetchMapDataAndInitializeMap(props.stateData);
  }, [props.stateData]);

  const fetchMapDataAndInitializeMap = async (stateData: StateData[]) => {
    try {
      const mapDataResponse = await fetch(
        "https://code.highcharts.com/mapdata/countries/us/us-all.topo.json"
      );
      const mapData: JSON = await mapDataResponse.json();

      initializeMap(stateData, mapData);
      console.log("Map data: ", mapData);
    } catch (error) {
      console.error("Error fetching map data:", error);
    }
  };

  function getMaxState(stateData: StateData[]): number {
    var max = stateData[0].value;
    for (var i = 1; i < stateData.length; i++) {
      if (stateData[i].value > max) {
        max = stateData[i].value;
      }
    }
    return max;
  }

  function getMinState(stateData: StateData[]): number {
    var min = stateData[0].value;
    for (var i = 1; i < stateData.length; i++) {
      if (stateData[i].value < min) {
        min = stateData[i].value;
      }
    }
    return min;
  }

  const initializeMap = (stateData: StateData[], mapData: JSON) => {
    const mapOptions: Highcharts.Options = {
      chart: {
        type: "map",
        map: mapData,
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
        },
      ],
    };
    Highcharts.mapChart("container", mapOptions);
  };

  return <div id="container" />;
};

export default MapChart;
