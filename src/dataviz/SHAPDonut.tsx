import React from "react";
import Highcharts, { SeriesPieOptions } from "highcharts";
import { SHAPFactor } from "@/types/SHAPFactor";

// WIP

interface DonutChartProps {
  SHAPFactors: Record<SHAPFactor, number> | undefined;
}

const series: SeriesPieOptions = {
  type: "pie",
  data: [
    {
      name: "Expert Ratings",
      y: 0.1,
    },
    {
      name: "Past Elections",
      y: 0.2,
    },
    {
      name: "Voting Regulations",
      y: 0.3,
    },
    {
      name: "Consumer Confidence Index",
      y: 0.4,
    },
  ],
};

const DonutChart: React.FC<DonutChartProps> = () => {
  const options: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    plotOptions: {
      pie: {
        innerSize: "50%",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
        },
      },
    },
    series: [series],
  };

  Highcharts.chart("container", options);

  return <div id="container"> </div>;
};

export default DonutChart;
