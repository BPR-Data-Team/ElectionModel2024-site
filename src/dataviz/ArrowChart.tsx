

function arrows(categories: string[], data: number[]) {
  Highcharts.chart("container4", {
    chart: {
      type: "bar",
    },
    title: {
      text: "Arrows Chart",
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
      categories: ["Polls", "Economic", "Past Elections", "Cost of Voting"],
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
      style: {
        fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
      },
    },
    series: [
      {
        name: "Impact",
        data: [-5, 3, -7, 2],
        threshold: 0,
      },
    ],
  } as any);
}
