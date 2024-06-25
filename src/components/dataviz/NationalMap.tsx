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
const NationalMap = () => {
    const stateData = [
        { code: 'us-al', value: -1 }, // Alabama
        { code: 'us-ak', value: -1 }, // Alaska
        { code: 'us-az', value: 1 },  // Arizona
        { code: 'us-ar', value: -1 }, // Arkansas
        { code: 'us-ca', value: 1 },  // California
        { code: 'us-co', value: 1 },  // Colorado
        { code: 'us-ct', value: 1 },  // Connecticut
        { code: 'us-de', value: 1 },  // Delaware
        { code: 'us-fl', value: -1 }, // Florida
        { code: 'us-ga', value: 1 },  // Georgia
        { code: 'us-hi', value: 1 },  // Hawaii
        { code: 'us-id', value: -1 }, // Idaho
        { code: 'us-il', value: 1 },  // Illinois
        { code: 'us-in', value: -1 }, // Indiana
        { code: 'us-ia', value: -1 }, // Iowa
        { code: 'us-ks', value: -1 }, // Kansas
        { code: 'us-ky', value: -1 }, // Kentucky
        { code: 'us-la', value: -1 }, // Louisiana
        { code: 'us-me', value: 1 },  // Maine
        { code: 'us-md', value: 1 },  // Maryland
        { code: 'us-ma', value: 1 },  // Massachusetts
        { code: 'us-mi', value: 1 },  // Michigan
        { code: 'us-mn', value: 1 },  // Minnesota
        { code: 'us-ms', value: -1 }, // Mississippi
        { code: 'us-mo', value: -1 }, // Missouri
        { code: 'us-mt', value: -1 }, // Montana
        { code: 'us-ne', value: -1 }, // Nebraska
        { code: 'us-nv', value: 1 },  // Nevada
        { code: 'us-nh', value: 1 },  // New Hampshire
        { code: 'us-nj', value: 1 },  // New Jersey
        { code: 'us-nm', value: 1 },  // New Mexico
        { code: 'us-ny', value: 1 },  // New York
        { code: 'us-nc', value: -1 }, // North Carolina
        { code: 'us-nd', value: -1 }, // North Dakota
        { code: 'us-oh', value: -1 }, // Ohio
        { code: 'us-ok', value: -1 }, // Oklahoma
        { code: 'us-or', value: 1 },  // Oregon
        { code: 'us-pa', value: 1 },  // Pennsylvania
        { code: 'us-ri', value: 1 },  // Rhode Island
        { code: 'us-sc', value: -1 }, // South Carolina
        { code: 'us-sd', value: -1 }, // South Dakota
        { code: 'us-tn', value: -1 }, // Tennessee
        { code: 'us-tx', value: -1 }, // Texas
        { code: 'us-ut', value: -1 }, // Utah
        { code: 'us-vt', value: 1 },  // Vermont
        { code: 'us-va', value: 1 },  // Virginia
        { code: 'us-wa', value: 1 },  // Washington
        { code: 'us-wv', value: -1 }, // West Virginia
        { code: 'us-wi', value: 1 },  // Wisconsin
        { code: 'us-wy', value: -1 }  // Wyoming
      ]

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
            series: [{
                type: "map",
                data: stateDataWithColors,
                mapData: mapData,
                joinBy: ['hc-key', 'code']}],
        };
        Highcharts.mapChart("container5", mapOptions);
    };

    return <div id="container5" />;
};

export default NationalMap;

