import React, {
    useEffect, useState
} from "react";
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";


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

    const stateDataWithColors = stateData.map((state) => {
        if (state.value === 1) {
            return { code: state.code, value: 1, color: "#595D9A" };
        } else {
            return { code: state.code, value: -1, color: "#B83C2B" };
        }
    });



    useEffect(() => {
        fetchMapData();
    }, []);

    const fetchMapData = () => {
        fetch("https://code.highcharts.com/mapdata/countries/us/us-all.topo.json")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                initializeMap(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const initializeMap = (mapData : any) => {
        const mapOptions: Highcharts.Options = {
            chart: {
                type: "map",
                map: mapData,
            },
            credits: {
                enabled: false,
            },
            accessibility: {
                description: "Map of the United States showing the average predicted margin by state.",
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
            series: [{
                type: "map",
                data: stateDataWithColors,
                mapData: mapData,
                joinBy: ['hc-key', 'code']}],
        };
        Highcharts.mapChart("container" + rank*5, mapOptions);
    };

    return <div id={"container" + rank*5}  />;
};

export default NationalMap;

