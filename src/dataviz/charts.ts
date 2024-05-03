import Highcharts from "highcharts";

function getTestData() {
  const testData = [
    { "hc-key": "us-al", value: 0.5 },
    { "hc-key": "us-ak", value: -0.2 },
    { "hc-key": "us-az", value: 1.2 },
    { "hc-key": "us-ar", value: -0.8 },
    { "hc-key": "us-ca", value: 2.5 },
    { "hc-key": "us-co", value: 0.7 },
    { "hc-key": "us-ct", value: 1.0 },
    { "hc-key": "us-de", value: -0.3 },
    { "hc-key": "us-fl", value: 1.8 },
    { "hc-key": "us-ga", value: 1.3 },
    { "hc-key": "us-hi", value: 0.4 },
    { "hc-key": "us-id", value: -0.5 },
    { "hc-key": "us-il", value: 0.9 },
    { "hc-key": "us-in", value: 0.6 },
    { "hc-key": "us-ia", value: -0.1 },
    { "hc-key": "us-ks", value: -0.4 },
    { "hc-key": "us-ky", value: 0.2 },
    { "hc-key": "us-la", value: 0.1 },
    { "hc-key": "us-me", value: -0.7 },
    { "hc-key": "us-md", value: 1.5 },
    { "hc-key": "us-ma", value: 1.7 },
    { "hc-key": "us-mi", value: 0.8 },
    { "hc-key": "us-mn", value: 0.3 },
    { "hc-key": "us-ms", value: -0.9 },
    { "hc-key": "us-mo", value: 0.0 },
    { "hc-key": "us-mt", value: -1.2 },
    { "hc-key": "us-ne", value: -0.6 },
    { "hc-key": "us-nv", value: 1.1 },
    { "hc-key": "us-nh", value: -0.4 },
    { "hc-key": "us-nj", value: 1.9 },
    { "hc-key": "us-nm", value: 0.6 },
    { "hc-key": "us-ny", value: 2.0 },
    { "hc-key": "us-nc", value: 1.4 },
    { "hc-key": "us-nd", value: -1.0 },
    { "hc-key": "us-oh", value: 0.7 },
    { "hc-key": "us-ok", value: -0.3 },
    { "hc-key": "us-or", value: 0.5 },
    { "hc-key": "us-pa", value: 1.1 },
    { "hc-key": "us-ri", value: 0.2 },
    { "hc-key": "us-sc", value: 0.9 },
    { "hc-key": "us-sd", value: -0.8 },
    { "hc-key": "us-tn", value: 0.3 },
    { "hc-key": "us-tx", value: 1.6 },
    { "hc-key": "us-ut", value: 0.8 },
    { "hc-key": "us-vt", value: -0.1 },
    { "hc-key": "us-va", value: 1.2 },
    { "hc-key": "us-wa", value: 1.4 },
    { "hc-key": "us-wv", value: -0.2 },
    { "hc-key": "us-wi", value: 0.4 },
    { "hc-key": "us-wy", value: -0.5 },
  ];
  return testData;
}

function initializeMap(stateData: any) {
  var mapData;
  var mapOptions;
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://code.highcharts.com/mapdata/countries/us/us-all.topo.json",
    true
  );
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      mapData = JSON.parse(xhr.responseText);
      mapOptions = {
        chart: {
          map: mapData,
        },
        accessibility: {
          description: "description",
        },
        title: {
          text: "Average Predicted Margin by State",
          style: {
            fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
          },
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: "bottom",
          },
        },
        colorAxis: {
          min: -3,
          max: 3,
          stops: [
            [0, "#B83C2B"], // Republican red
            [0.49999999, "#DB9D95"], // WIP
            [0.5, "#ACAECC"],
            [1, "#595D9A"], // Democrat blue
          ],
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
    }
  };
  xhr.send();
}
