import Highcharts, { pad } from "highcharts";
import { useLayoutEffect } from "react";

interface LiveBarChartProps {
  demPercent: number;
  repPercent: number;
  tiePercent: number;
}

export const LiveBarChart = (props: LiveBarChartProps) => {
  useLayoutEffect(() => {
    const data: Record<string, number> = {
      Democrat: props.demPercent,
      Tie: props.tiePercent,
      Republican: props.repPercent,
    };

    const categories: string[] = ["Live Prediction"]; // Single category for the stacked bar chart
    const seriesData: { name: string; data: number[] }[] = [];

    for (const label in data) {
      if (Object.prototype.hasOwnProperty.call(data, label)) {
        const value = parseFloat(data[label].toFixed(1));
        seriesData.push({
          name: label,
          data: [value],
        });
      }
    }

    createStackedBarChart(categories, seriesData);
  }, [props.demPercent, props.repPercent, props.tiePercent]);

  return <div id="container9"></div>;
};

function createStackedBarChart(
  categories: string[],
  seriesData: { name: string; data: number[] }[]
) {
  Highcharts.chart("container9", {
    chart: {
      type: "bar",
      height: "80px",
      width: null,
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
          overflow: "none",
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
