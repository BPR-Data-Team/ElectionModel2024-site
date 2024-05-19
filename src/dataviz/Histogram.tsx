import { Party, getOppositeParty, getPartyColor } from "@/types/Party";
import { RaceType } from "@/types/RaceType";
import { State } from "@/types/State";
import * as Highcharts from "highcharts";
import { useLayoutEffect } from "react";

function generateMarginsData(count: number): number[] {
  const data: number[] = [];
  for (let i = 0; i < count; i++) {
    data.push(Math.floor(Math.random() * 201) - 100); // Generate random margin between -100 and 100
  }
  return data;
}

// Generate random house data
function generateHouseData(count: number): number[] {
  const data: number[] = [];
  for (let i = 0; i < count; i++) {
    data.push(Math.floor(Math.random() * 77) - 38); // Generate random margin between -38 and 38
  }
  return data;
}

// Generate random seats data
function generateSeatsData(count: number): number[] {
  const data: number[] = [];
  for (let i = 0; i < count; i++) {
    data.push(Math.floor(Math.random() * 21) - 10); // Generate random margin between -10 and 10
  }
  return data;
}

interface HistogramProps {
  binBounds: [number, number];
  binEdges: number[];
  bins: number[];
  raceType: RaceType;
  state: State;
  winner: Party;
}

export const Histogram = (props: HistogramProps) => {
  useLayoutEffect(() => {
    // if (props.raceType == RaceType.House && props.state == State.National) {
    //   HouseHistogram(props.simulations, props.winner);
    // } else if (
    //   props.raceType == RaceType.Senate &&
    //   props.state == State.National
    // ) {
    //   SenateHistogram(props.simulations, props.winner);
    // } else if (
    //   props.raceType == RaceType.Presidential &&
    //   props.state == State.National
    // ) {
    //   PresidentHistogram(props.simulations, props.winner);
    // } else {
    //   MarginHistogram(props.simulations);
    // }
    makeHistogram(
      props.binBounds,
      props.binEdges,
      props.bins,
      props.raceType,
      props.state,
      props.winner
    );
  }, [props.bins, props.raceType, props.state]);
  return <div id="container1"></div>;
};

const fake_min = -100;
const fake_max = 100;
const fake_bins = [
  0, 0, 2, 8, 35, 145, 304, 831, 1682, 3396, 5769, 8447, 11373, 13475, 14085,
  12625, 10577, 7383, 4832, 2751, 1380, 540, 260, 73, 18, 6, 2, 0, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
const fake_bin_edges = Array.from({ length: 47 }, (_, i) => (i - 23) * 4).map(
  (x) => parseFloat(x.toFixed(2))
);

function makeHistogram(
  binBounds: [number, number],
  binEdges: number[],
  bins: number[],
  raceType: RaceType,
  state: State,
  winner: Party
) {
  const getBinColor = (bin_val: number): string => {
    if (state === State.National) {
      if (raceType === RaceType.Presidential) {
        if (bin_val > 269) {
          return getPartyColor(winner);
        } else if (bin_val < 269) {
          return getPartyColor(getOppositeParty(winner));
        }
        return getPartyColor(Party.Tie);
      } else if (raceType === RaceType.House) {
        if (bin_val >= 218) {
          return getPartyColor(winner);
        }
        return getPartyColor(getOppositeParty(winner));
      } else if (raceType === RaceType.Senate) {
        if (winner === Party.Tie) {
          if (bin_val > 50) {
            return getPartyColor(Party.Democrat);
          } else if (bin_val < 50) {
            return getPartyColor(Party.Republican);
          }
          return getPartyColor(Party.Tie);
        } else {
          if (bin_val > 50) {
            return getPartyColor(winner);
          } else if (bin_val < 50) {
            return getPartyColor(getOppositeParty(winner));
          }
          return getPartyColor(Party.Tie);
        }
      }
    }
    return bin_val < 0
      ? getPartyColor(Party.Republican)
      : getPartyColor(Party.Democrat);
  };

  const getBinX = (index: number): number => {
    return Math.round((binEdges[index] + binEdges[index + 1]) / 2);
  };

  const histogramSeries: any = bins.map((frequency, index) => ({
    x: getBinX(index),
    y: frequency,
    color: getBinColor(getBinX(index)),
  }));

  const xAxisTitle: string = (() => {
    if (state === State.National) {
      if (raceType === RaceType.Presidential) {
        return winner === Party.Tie
          ? `${Party.Democrat} Electoral Votes`
          : `${winner} Electoral Votes`;
      } else if (raceType === RaceType.House) {
        return winner === Party.Tie
          ? `${Party.Democrat} Seats`
          : `${winner} Seats`;
      } else if (raceType === RaceType.Senate) {
        return winner === Party.Tie
          ? `${Party.Democrat} Seats`
          : `${winner} Seats`;
      }
    }
    return "Margin";
  })();

  Highcharts.chart("container1", {
    chart: {
      type: "column",
      backgroundColor: "white",
    },
    title: {
      text: "",
    },
    xAxis: {
      min: binBounds[0],
      max: binBounds[1],
      title: {
        text: xAxisTitle,
        style: {
          color: "black",
          fontSize: "18px",
          fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
        },
      },
      labels: {
        formatter: function (this: any) {
          if (state === State.National) {
            return this.value;
          }
          if (this.value < 0) {
            return `+${Math.abs(this.value)} R`;
          }
          if (this.value > 0) {
            return `+${Math.abs(this.value)} D`;
          }
          return "Tie";
        },
        style: {
          color: "black",
          fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
        },
      },
    },
    yAxis: {
      title: {
        text: "Simulations",
        style: {
          color: "black",
          fontSize: "18px",
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
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        groupPadding: 0,
        borderRadius: 7,
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      formatter: function (this: any) {
        if (state === State.National) {
          return `<b>${this.x}</b><br />Simulations: <b>${this.y}</b>`;
        }
        if (this.x < 0) {
          return `<b>+${Math.abs(this.x)} R</b><br />Simulations: <b>${
            this.y
          }</b>`;
        }
        if (this.x > 0) {
          return `<b>+${Math.abs(this.x)} D</b><br />Simulations: <b>${
            this.y
          }</b>`;
        }
        return `<b>Tie</b><br />Simulations: <b>${this.y}</b>`;
      },
      style: {
        fontSize: "12px",
        fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
      },
    },
    series: [
      {
        name: "Simulations",
        data: histogramSeries,
      },
    ],
  } as any);
}

function MarginHistogram(input_data: number[]) {
  // Highcharts chart initialization code here
  // Make sure the chart is initialized after setting the dimensions
  const data: number[] = input_data;
  const binCount: number = 100; // Define the number of bins
  const totalRange: number = 200; // Define the total range of the data

  // Calculate the size of each bin to evenly split the range around 0
  const binSize: number = totalRange / (binCount - 1);

  // Calculate the starting point for the bins to center around 0
  const startBin: number = -totalRange / 2;

  const bins: number[] = Array.from(
    { length: binCount },
    (_, i) => startBin + i * binSize
  );

  const histogramData: number[] = Array(bins.length - 1).fill(0);

  const histogramSeries: any = fake_bins.map((frequency, index) => ({
    x: Math.round((fake_bin_edges[index] + fake_bin_edges[index + 1]) / 2),
    y: frequency,
    color: fake_bin_edges[index] < 0 ? "#B83C2B" : "#595D9A",
  }));

  Highcharts.chart("container1", {
    chart: {
      type: "column",
      backgroundColor: "white",
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      min: fake_min,
      max: fake_max,
      title: {
        text: "Margin",
        style: {
          color: "black",
          fontSize: "18px",
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
    yAxis: {
      title: {
        text: "Simulations",
        style: {
          color: "black",
          fontSize: "18px",
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
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        groupPadding: 0,
        borderRadius: 7,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
      },
    },
    series: [
      {
        name: "Simulations",
        data: histogramSeries,
      },
    ],
  } as any);
}

function SenateHistogram(input_data: number[], winner: Party) {
  const data: number[] = input_data;

  const binCount: number = 21; // 40 seats to 60 seats

  // Calculate the starting point for the bins to start from 40
  const startBin: number = 40;

  const bins: number[] = Array.from(
    { length: binCount },
    (_, i) => startBin + i
  );

  const histogramData: number[] = Array(bins.length - 1).fill(0);

  data.forEach((margin: number) => {
    for (let i = 1; i < bins.length; i++) {
      if (margin >= bins[i - 1] && margin < bins[i]) {
        histogramData[i - 1]++;
        break;
      }
    }
  });

  const getBinColor = (bin_val: number): string => {
    if (winner === Party.Tie) {
      if (bin_val > 50) {
        return getPartyColor(Party.Democrat);
      } else if (bin_val < 50) {
        return getPartyColor(Party.Republican);
      } else {
        return getPartyColor(Party.Tie);
      }
    } else {
      if (bin_val > 50) {
        return getPartyColor(winner);
      } else if (bin_val < 50) {
        return getPartyColor(getOppositeParty(winner));
      } else {
        return getPartyColor(Party.Tie);
      }
    }
  };

  const histogramSeries: any = histogramData.map((frequency, index) => ({
    x: bins[index],
    y: frequency,
    color: getBinColor(bins[index]),
  }));

  Highcharts.chart("container1", {
    chart: {
      type: "column",
      backgroundColor: "white",
    },
    title: {
      text: "",
      style: {
        color: "black",
        fontSize: "18px",
        fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
      },
    },
    xAxis: {
      min: 40,
      max: 60,
      title: {
        text: "Seats",
        style: {
          color: "black",
          fontSize: "18px",
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
    yAxis: {
      title: {
        text: "Simulations",
        style: {
          color: "black",
          fontSize: "18px",
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
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        groupPadding: 0,
        borderRadius: 7,
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
      },
    },
    series: [
      {
        name: "Simulations",
        data: histogramSeries,
      },
    ],
  } as any);
}

function HouseHistogram(input_data: number[], winner: Party) {
  const data: number[] = input_data;

  const binCount: number = 33; // Define the number of bins
  const totalRange: number = 435; // Define the total range of the data

  // Calculate the size of each bin to evenly split the range around 0
  const binSize: number = totalRange / (binCount - 1);

  // Calculate the starting point for the bins to center around 0
  const startBin: number = 0;

  const bins: number[] = Array.from(
    { length: binCount },
    (_, i) => startBin + i * binSize
  );

  const histogramData: number[] = Array(bins.length - 1).fill(0);

  data.forEach((margin: number) => {
    for (let i = 1; i < bins.length; i++) {
      if (margin >= bins[i - 1] && margin < bins[i]) {
        histogramData[i - 1]++;
        break;
      }
    }
  });

  const getBinColor = (bin_val: number): string => {
    if (bin_val >= 218) {
      return getPartyColor(winner);
    }
    return getPartyColor(getOppositeParty(winner));
  };

  const getBinX = (index: number): number => {
    return Math.round((bins[index] + bins[index + 1]) / 2);
  };

  const histogramSeries: any = histogramData.map((frequency, index) => ({
    x: getBinX(index),
    y: frequency,
    color: getBinColor(getBinX(index)),
  }));

  Highcharts.chart("container1", {
    chart: {
      type: "column",
      backgroundColor: "white",
    },
    title: {
      text: "",
      style: {
        color: "black",
        fontSize: "18px",
        fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
      },
    },
    xAxis: {
      min: 0,
      max: 435,
      title: {
        text: "Seats",
        style: {
          color: "black",
          fontSize: "18px",
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
    yAxis: {
      title: {
        text: "Simulations",
        style: {
          color: "black",
          fontSize: "18px",
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
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        groupPadding: 0,
        borderRadius: 7,
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
      },
    },
    series: [
      {
        name: "Simulations",
        data: histogramSeries,
      },
    ],
  } as any);
}

function PresidentHistogram(input_data: number[], winner: Party) {
  const data: number[] = input_data;
  if (winner == Party.Republican) {
    for (let i = 0; i < data.length; i++) {
      data[i] = 538 - data[i];
    }
  }
  // Highcharts chart initialization code here
  // Make sure the chart is initialized after setting the dimensions
  const binCount: number = 25; // Define the number of bins
  const totalRange: number = 538; // Define the total range of the data

  // Calculate the size of each bin to evenly split the range around 0
  const binSize: number = Math.round(totalRange / (binCount - 1));

  // Calculate the starting point for the bins to center around 0
  const startBin: number = 0;

  const bins: number[] = Array.from(
    { length: binCount },
    (_, i) => startBin + i * binSize
  );

  const histogramData: number[] = Array(bins.length - 1).fill(0);

  data.forEach((margin: number) => {
    for (let i = 1; i < bins.length; i++) {
      if (margin >= bins[i - 1] && margin < bins[i]) {
        histogramData[i - 1]++;
        break;
      }
    }
  });

  const getBinColor = (bin_val: number): string => {
    if (bin_val > 269) {
      return getPartyColor(winner);
    } else if (bin_val < 269) {
      return getPartyColor(getOppositeParty(winner));
    } else {
      return getPartyColor(Party.Tie);
    }
  };

  const getBinX = (index: number): number => {
    return Math.round((bins[index] + bins[index + 1]) / 2);
  };

  const histogramSeries: any = histogramData.map((frequency, index) => ({
    x: getBinX(index),
    y: frequency,
    color: getBinColor(getBinX(index)),
  }));

  Highcharts.chart("container1", {
    chart: {
      type: "column",
      backgroundColor: "white",
    },
    title: {
      text: "",
    },
    xAxis: {
      min: 0,
      max: 538,
      title: {
        text: "Electoral Votes",
        style: {
          color: "black",
          fontSize: "18px",
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
    yAxis: {
      title: {
        text: "Simulations",
        style: {
          color: "black",
          fontSize: "18px",
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
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        groupPadding: 0,
        borderRadius: 7,
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
      },
    },
    series: [
      {
        name: "Simulations",
        data: histogramSeries,
      },
    ],
  } as any);
}
