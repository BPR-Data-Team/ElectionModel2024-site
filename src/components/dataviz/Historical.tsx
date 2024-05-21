import { Party, getOppositeParty, getPartyColor } from "@/types/Party";
import { RaceType } from "@/types/RaceType";
import { State } from "@/types/State";
import { formatNumber } from "@/utils";
import * as Highcharts from "highcharts";
import { useLayoutEffect } from "react";

interface HistoricalProps {
  binBounds: [number, number];
  binEdges: number[];
  bins: number[];
  raceType: RaceType;
  state: State;
  winner: Party;
}

export const Historical = (props: HistoricalProps) => {
  useLayoutEffect(() => {
    makeHistorical(
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

function makeHistorical(
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
      type: "area",
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
        text: "Predicted Margin",
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
      area: {
        negativeColor: 'red'
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      formatter: function (this: any) {
        if (state === State.National) {
          return `<b>${this.x}</b><br />Simulations: <b>${formatNumber(
            this.y
          )}</b>`;
        }
        if (this.x < 0) {
          return `<b>R +${Math.abs(
            this.x
          )}</b><br />Simulations: <b>${formatNumber(this.y)}</b>`;
        }
        if (this.x > 0) {
          return `<b>D +${Math.abs(
            this.x
          )}</b><br />Simulations: <b>${formatNumber(this.y)}</b>`;
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
