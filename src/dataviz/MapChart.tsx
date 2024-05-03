import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";
import { ColorString } from "highcharts";

HighchartsMap(Highcharts);

interface StateData {
  "hc-key": string;
  value: number;
}

interface MapProps {
  stateData: StateData[];
}

const colorAxisStops: Array<[number, ColorString]> = [
  [0, "#B83C2B"], // Republican red
  [0.49999999, "#DB9D95"], // WIP
  [0.5, "#ACAECC"],
  [1, "#595D9A"], // Democrat blue
];

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
        min: -3,
        max: 3,
        stops: colorAxisStops,
        visible: false,
      } as Highcharts.ColorAxisOptions,
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
