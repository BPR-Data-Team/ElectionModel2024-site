
import Highcharts from "highcharts";
import { useLayoutEffect } from "react";

export const StackedBarChart = () => {
  useLayoutEffect(() => {
    // Define local test data
    //Add up to 100
    const testData: Record<string, number> = {
      "Democrat": 55,
      "Tie": 5,
      "Republican": 40,
    };

    const categories: string[] = ["Live Prediction"]; // Single category for the stacked bar chart
    const seriesData: { name: string; data: number[] }[] = [];

    // Prepare data for the stacked bar chart using test data
    for (const label in testData) {
      if (Object.prototype.hasOwnProperty.call(testData, label)) {
        const value = parseFloat(testData[label].toFixed(1));
        seriesData.push({
          name: label,
          data: [value],
        });
      }
    }

    createStackedBarChart(categories, seriesData);
  }, []);

  return <div id="container4"></div>;
};

export default StackedBarChart;

function createStackedBarChart(categories: string[], seriesData: { name: string; data: number[] }[]) {
  Highcharts.chart("container4", {
    chart: {
      type: "bar",
      height: "80px",
      backgroundColor: null,
      margin: [0, 0, 0, 0], // Remove external margins
      spacing: [0, 0, 0, 0], // Ensure no extra spacing
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
      style: {
        color: "black",
        fontSize: "18px",
        fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
      },
    },
    colors: ["#595D9A", "#505050", "#B83C2B"],
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: categories,
      title: null,
      lineWidth: 0,
      tickLength: 0, // Remove tick marks
      labels: {
        enabled: false,
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      gridLineWidth: 0,
      lineWidth: 0,
      tickLength: 0, // Remove tick marks
      title: null,
      labels: {
        enabled: false,
      },
    },
    tooltip: {
      pointFormat: "{series.name}: {point.y}%",
      formatter: function () {
        if (this.y < 10) {
          return this.series.name + ": " + this.y + "%";
        }
        return false;
      },
      style: {
        fontSize: "12px",
        fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
      },
    },
    plotOptions: {
      series: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
          padding: 0, // Remove padding from data labels
          formatter: function () {
            let label = "";
            if (this.y >= 8) {
              label = this.series.name + " " + this.y + "%";
            }
            return label;
          },
          style: {
            color: "white",
            fontSize: "18px",
            fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
            textOutline: "none",
          },
        },
      },
    },
    series: seriesData,
  } as any);
}
