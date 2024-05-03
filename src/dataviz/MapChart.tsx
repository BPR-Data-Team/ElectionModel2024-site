import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";

HighchartsMap(Highcharts);

export interface StateData {
  "hc-key": string;
  value: number;
}

interface MapProps {
  stateData: StateData[];
}

const MapChart: React.FC<MapProps> = ({ stateData }) => {
  useEffect(() => {
    fetchMapDataAndInitializeMap(stateData);
  }, [stateData]);

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
    var mapOptions: Highcharts.Options = {
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
      colorAxis: {
        min: getMinState(stateData),
        max: getMaxState(stateData),
        stops: [
          [0, "#B83C2B"], // Republican red
          // [0.49, "#DB9D95"], // WIP
          [0.5, "#EAEAEA"],
          // [0.50000001, "#ACAECC"],
          [1, "#595D9A"], // Democrat blue
        ],
        // hide the color axis
        visible: false,
      },
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
