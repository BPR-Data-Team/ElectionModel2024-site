import React, { useEffect } from "react";
import Highcharts, { SeriesPieOptions } from "highcharts";
import { SHAPFactor } from "@/types/SHAPFactor";
import highchartsAccessibility from "highcharts/modules/accessibility";
if (typeof window !== `undefined`) {
  highchartsAccessibility(Highcharts);
}

interface DonutChartProps {
  SHAPFactors: Record<SHAPFactor, number> | undefined;
}

const DonutChart: React.FC<DonutChartProps> = ({ SHAPFactors }) => {
  const totalSum = SHAPFactors
    ? Object.values(SHAPFactors).reduce((acc, val) => acc + Math.abs(val), 0)
    : 0;

  const data = SHAPFactors
    ? Object.entries(SHAPFactors)
        .map(([name, value]) => ({
          name: name,
          y: parseFloat(((Math.abs(value) / totalSum) * 100).toFixed(1)),
          color: value < 0 ? "#B83C2B" : "#595D9A",
        }))
        .sort((a, b) => b.y - a.y)
    : [];

  useEffect(() => {
    const options: Highcharts.Options = {
      chart: {
        type: "pie",
        height: 250,
        margin: 25,
        width: null,
        style: {fontFamily: "var(--radioCanada), sans-serif", fontSize: "1rem"}
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "",
      },
      plotOptions: {
        pie: {
          center: ["50%", "40%"],
          innerSize: "30%",
          dataLabels: {
            enabled: true,
            formatter: function() {
              if (this.point.index < 3 && this.point.y && this.point.y > 7) {
                return this.point.name;
              } else {
                return null;
              }
            },
            style: {
              textOverflow: 'clip',
              fontFamily: 'inherit',
            },
            distance: 5,
          },
        },
      },
      tooltip: {
        formatter: function() {
          return `<b>${this.key}</b>: ${this.y}%`;
        },
        style: {
          fontFamily: 'inherit',
        },
      },
      series: [
        {
          type: "pie",
          data: data,
          name: "Importance",
          dataLabels: {
            style: {
              fontFamily:
                'inherit',
            },
          },
        },
      ],
    };

    Highcharts.chart("container2", options);
  }, [SHAPFactors]);

  return <div id="container2"> </div>;
};

export default DonutChart;
