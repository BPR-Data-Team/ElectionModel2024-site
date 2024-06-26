import { SHAPFactor } from "@/types/SHAPFactor";
import Highcharts from "highcharts";
import { useLayoutEffect } from "react";
import highchartsAccessibility from "highcharts/modules/accessibility";
if (typeof window !== `undefined`) {
  highchartsAccessibility(Highcharts);
}

interface ArrowProps {
  SHAP: Record<SHAPFactor, number> | undefined;
}

const ArrowChart = (props: ArrowProps) => {
  useLayoutEffect(() => {
    if (props.SHAP == undefined) {
    } else {
      var categories: string[] = [];
      var data: number[] = [];
      for (const factor in props.SHAP) {
        if (Object.prototype.hasOwnProperty.call(props.SHAP, factor)) {
          categories.push(factor);
          data.push(parseFloat(props.SHAP[factor as SHAPFactor].toFixed(1)));
        }
      }
      arrows(categories, data);
    }
  });

  return <div id="container4"></div>;
};

export default ArrowChart;

function arrows(categories: string[], data: number[]) {
  Highcharts.chart("container4", {
    chart: {
      borderRadius: 5,
      type: "bar",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
      style: {
        color: "black",
        fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      title: {
        //   text: 'Arrows Chart'
      },
      categories: categories,
      labels: {
        style: {
          color: "black",
          fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
        },
        
      },
    },
    yAxis: {
      title: {
        text: " ",
        style: {
          color: "black",
          fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
        },
      },
      labels: {
        formatter: function(this:any) {
          if (this.value >= 0) {
              return 'D +' + Math.abs(this.value);
          } else {
              return 'R +' + Math.abs(this.value);
          }
      },
        style: {
          color: "black",
          fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
        },
      },
    },
    plotOptions: {
      bar: {
        colorByPoint: true,
        colors: ["#B83C2B", "#595D9A"], // Red for negative values, blue for positive values
      },
    },
    tooltip: {
      formatter: function(this: any) {
        let prefix = this.y >= 0 ? 'D ' : 'R ';
        return '<b>' + this.series.name + '</b><br/>' + prefix +'+'+ Math.abs(this.y);
    },
      style: {
        fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
      },
    },
    series: [
      {
        name: "Impact",
        data: data.map((value) => {
          return {
            y: value,
            color: value >= 0 ? "#595D9A " : "#B83C2B ",
          };
        }),
        threshold: 0,
      },
    ],
  } as any);
}
