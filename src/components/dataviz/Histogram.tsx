import { Party, getOppositeParty, getPartyColor } from "@/types/Party";
import { RaceType } from "@/types/RaceType";
import { State } from "@/types/State";
import { formatNumber } from "@/utils";
import * as Highcharts from "highcharts";
import { useLayoutEffect } from "react";

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
          return getPartyColor(Party.Democrat);
        } else if (bin_val < 269) {
          return getPartyColor(Party.Republican);
        }
        return getPartyColor(Party.Tie);
      } else if (raceType === RaceType.House) {
        if (bin_val >= 218) {
          return getPartyColor(Party.Democrat);
        }
        return getPartyColor(Party.Republican);
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
            return getPartyColor(Party.Democrat);
          } else if (bin_val < 50) {
            return getPartyColor(Party.Republican);
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
  
  const getWidthX = (index: number): number => {
    return Math.round((binEdges[index + 1] - binEdges[index]) / 2)
  };

  const histogramSeries: any = bins.map((frequency, index) => ({
    x: getBinX(index),
    y: frequency,
    width: getWidthX(index),
    color: getBinColor(getBinX(index)),
  }));

  const xAxisTitle: string = (() => {
    if (state === State.National) {
      if (raceType === RaceType.Presidential) {
        return `${Party.Democrat} Electoral Votes`
      } else if (raceType === RaceType.House) {
        return `${Party.Democrat} Seats`
      } else if (raceType === RaceType.Senate) {
        return `${Party.Democrat} Seats`
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
            return `R +${Math.abs(this.value)}`;
          }
          if (this.value > 0) {
            return `D +${Math.abs(this.value)}`;
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
        const point = this.point; // Access the point object
        const width = point.width; // Now you can use the width from the point

        if (state === State.National && raceType === RaceType.Presidential) {
          return `<b>${point.x - width + 1}-${point.x + width - 1}</b><br />Simulations: <b>${formatNumber(point.y)}</b>`;
        }
        if (state === State.National && raceType === RaceType.Senate) {
          return `<b>${point.x}</b><br />Simulations: <b>${formatNumber(point.y)}</b>`;
        }
        if (state == State.National && raceType === RaceType.House) {
          return `<b>${point.x - width}</b><br />Simulations: <b>${formatNumber(point.y)}</b>`;
        }
        if (this.x < 0) {
          return `<b>R+${Math.abs(this.x) - width} - R+${Math.abs(this.x) + width}</b><br />Simulations: <b>${formatNumber(this.y)}</b>`;
        }
        if (this.x > 0) {
          return `<b>D+${Math.abs(this.x) - width} - D+${Math.abs(this.x) + width}</b><br />Simulations: <b>${formatNumber(this.y)}</b>`;
        }
        return `<b>Tie</b><br />Simulations: <b>${formatNumber(this.y)}</b>`;
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
