import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";
import highchartsAccessibility from "highcharts/modules/accessibility";
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
        enabled: false
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
        formatter: function(this:any) {
          let prefix = this.point.value >= 0 ? 'D ' : 'R ';
          return '<b>' + this.point.name + '</b><br/>' + prefix + '+' + Math.abs(this.point.value);
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
        },
      ],
    };
    Highcharts.mapChart("container", mapOptions);
  };

  return <div id="container" />;
};

export default MapChart;
