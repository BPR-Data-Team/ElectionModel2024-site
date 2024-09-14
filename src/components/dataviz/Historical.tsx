import { Party, getOppositeParty, getPartyColor } from "@/types/Party";
import { RaceType } from "@/types/RaceType";
import Highcharts from "highcharts";
import { useLayoutEffect, useEffect, useState } from "react";
import { State } from "@/types/State";
import styles from "../modules/PredictionModule.module.css";

interface HistoricalProps {
  raceType: RaceType;
  state: State;
  dates: string[];
  demWinPercents: number[];
  repWinPercents: number[];
  tiePercents: number[];
}

const Historical: React.FC<HistoricalProps> = (props: HistoricalProps) => {
const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures the component renders only on the client side.
    setIsClient(typeof window !== "undefined");
  }, []);

  const dates = props.dates;
  const year = new Date().getFullYear();
  const dateTimeStamps = dates.map((date) =>
    new Date(`${year}-${date}`).getTime()
  );
  const demWinPercents: number[] = props.demWinPercents;
  const repWinPercents: number[] = props.repWinPercents;
  const tiePercents = props.tiePercents;

  const includeTies =
    props.state == State.National &&
    (props.raceType == RaceType.Presidential ||
      props.raceType == RaceType.Senate);

  const seriesData: Highcharts.SeriesOptionsType[] = [
    {
      type: "spline",
      marker: {
        enabled: false,
        states: { hover: { enabled: false } },
      },
      lineWidth: 3.5,
      name: "Democratic Chance of Winning",
      data: dateTimeStamps.map((timestamp, index) => [
        timestamp,
        demWinPercents[index],
      ]),
      color: "#595D9A",
    },
    {
      type: "spline",
      marker: { enabled: false },
      states: { hover: { enabled: false } },
      lineWidth: 3.5,
      name: "Republican Chance of Winning",
      data: dateTimeStamps.map((timestamp, index) => [
        timestamp,
        repWinPercents[index],
      ]),
      color: "#B83C2B",
    },
  ];

  if (includeTies) {
    seriesData.push({
      type: "spline",
      marker: { enabled: false },
      states: { hover: { enabled: false } },
      lineWidth: 3.5,
      name: "Tie Chance",
      data: dateTimeStamps.map((timestamp, index) => [
        timestamp,
        tiePercents[index],
      ]),
      color: "#505050",
    });
  }

  useLayoutEffect(() => {
    if (isClient) {
      const HighchartsMore = require("highcharts/highcharts-more");
      HighchartsMore(Highcharts);

      const options: Highcharts.Options = {
        chart: {
          type: "spline",
          style: {
            fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
          },
        },
        title: {
          text: "",
        },
        xAxis: {
          type: "datetime",
          dateTimeLabelFormats: {
            month: "%b",
          },
          title: {
            text: "Month",
            style: {
              color: "black",
              fontSize: "18px",
              fontFamily:
                "gelica, book antiqua, georgia, times new roman, serif",
            },
          },
          labels: {
            style: {
              color: "black",
              fontFamily:
                "gelica, book antiqua, georgia, times new roman, serif",
            },
          },
          crosshair: {
            width: 1,
            color: "black",
            dashStyle: "ShortDash",
            label: {
              enabled: false,
            },
          },
          max: Date.UTC(2024, 10, 5),
        },
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: "Win Percentage",
            style: {
              color: "black",
              fontSize: "18px",
              fontFamily:
                "gelica, book antiqua, georgia, times new roman, serif",
            },
          },
          labels: {
            style: {
              color: "black",
              fontFamily:
                "gelica, book antiqua, georgia, times new roman, serif",
            },
            formatter: function () {
              return this.value + "%";
            },
          },
        },
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          formatter: function () {
            let date = this.x;
            if (typeof this.x == "number") {
              date = Highcharts.dateFormat("%A, %B %d", this.x);
            }
            const demWinPercent = this.points ? this.points[0].y : null;
            const repWinPercent = this.points ? this.points[1].y : null;
            const tiesPercent = this.points ? this.points[2]?.y : null;
            let tooltip = `<b>${date}:</b><br> Democrats win <span style="color:#595D9A;">${demWinPercent?.toFixed(
              0
            )}%</span> of the time<br> Republicans win <span style="color: #B83C2B;">${repWinPercent?.toFixed(
              0
            )}%</span> of the time`;
            if (includeTies) {
              tooltip += `<br> Ties occur <span style="color:#505050;">${tiesPercent?.toFixed(
                0
              )}%</span> of the time`;
            }
            return tooltip;
          },
          shared: true,
        },
        series: seriesData,
      };

      Highcharts.chart("container6", options);
    }
  }, [isClient, seriesData]);

  return (
    <div id="historical_graph">
      <div id="container6"></div>
      <div id="historical-disclaimer">
        <p className={styles.note} id="historical-disclaimer-text">
          * Significant daily fluctuations are often linked to new campaign
          finance information or updates in modeling approach (click to see{" "}
          <a
            href="https://24cast.org/methodology#changelog"
            className={styles.linkText}
          >
            changelog
          </a>
          )
        </p>
      </div>
    </div>
  );
};

export default Historical;
