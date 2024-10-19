
import Highcharts from "highcharts";
import { useLayoutEffect } from "react";

export const StackedBarChart = () => {
  useLayoutEffect(() => {
    // Define local test data
    //Add up to 100
    const testData: Record<string, number> = {
      "Democrat": 45,
      "Unknown": 15,
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
      height:"150px",
      backgroundColor:null,
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
    colors: ["#595D9A","#505050", "#B83C2B"],
    legend: {
      enabled: false,
      itemMarginTop:2,
    },
    spacing: [0, 0, 0, 0],
    xAxis: {
      categories: categories, // Single category for the stacked bar chart
      title:null,
      lineWidth: 0, // Remove the axis line
      labels: {
        enabled:false,
        style: {
          color: "black",
          fontFamily: "Arial, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      max: 100, // Set the maximum value to 100
      gridLineWidth: 0, // Remove the grid lines
      lineWidth: 0, // Remove the axis line
      title:null,
      stackLabels: {
        enabled: false,
        style: {
          fontWeight: "bold",
          color: "gray",
        },
      },
      labels: {
        enabled:false,
        style: {
          fontSize: "12px",
          fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
        },
      },
    },
    tooltip: {
      // headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}%",
      style: {
        fontSize: "12px",
        fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
      },
    },
    plotOptions: {
      series: {
        stacking: "normal", // Enable stacking
        dataLabels: {
          enabled: true,
          // formatter: function() {
          //   return this.y + '%'; // Add percentage sign to data labels
          // },
          style: {
            color: "white",
            fontSize:"18px",
            fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
            textOutline: "none",
          },
        },
      },
    },
    series: seriesData,
  } as any);
}
