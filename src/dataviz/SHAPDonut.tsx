import React, { useLayoutEffect } from "react";
import Highcharts, { SeriesPieOptions } from "highcharts";
import { SHAPFactor } from "@/types/SHAPFactor";
import highchartsAccessibility from "highcharts/modules/accessibility";
highchartsAccessibility(Highcharts);
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
  useLayoutEffect(() => {
    const options: Highcharts.Options = {
      title: {
        text: "",
      },
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

    Highcharts.chart("container2", options);
  });

  return <div id="container2"> </div>;
};

export default DonutChart;
