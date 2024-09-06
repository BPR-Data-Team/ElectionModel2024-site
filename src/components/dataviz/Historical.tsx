import { Party, getOppositeParty, getPartyColor } from "@/types/Party";
import { RaceType } from "@/types/RaceType";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
HighchartsMore(Highcharts);
import { State } from "@/types/State";
import { formatNumber } from "@/utils";
import { useLayoutEffect } from "react";

interface HistoricalProps {
  raceType: RaceType;
  state: State;
  dates: string[];
  demWinPercents: number[];
  repWinPercents: number[];
  tiePercents: number[];
}

const Historical: React.FC<HistoricalProps> = (props: HistoricalProps) => {
  // Example data for each month from Jan to Jan 
  console.log(props.dates);
  const dates = props.dates;
  const year = new Date().getFullYear(); // Get the current year

  // Convert each "MM-DD" string to a date by adding the year
  const dateTimeStamps = dates.map((date) =>
    new Date(`${year}-${date}`).getTime()
  );
  const demWinPercents: number[] = props.demWinPercents;
  const repWinPercents: number[] = props.repWinPercents;
  const tiePercents = props.tiePercents;

  // Exampled data finished

  const includeTies =
    props.state == State.National &&
    (props.raceType == RaceType.Presidential ||
      props.raceType == RaceType.Senate); // Only include ties for pres/senate national

  //Need to define seriesData outside of the layout effect because of includeTies
  const seriesData: Highcharts.SeriesOptionsType[] = [
    {
      type: "spline",
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: false, // Disable markers on hover
          },
        },
      },
      lineWidth: 3.5,
      name: "Democratic Chance of Winning",
      data: dateTimeStamps.map((timestamp, index) => [
        timestamp,
        demWinPercents[index],
      ]), // Combine timestamps with data
      color: "#595D9A", // Customize color for Democratic line
    },
    {
      type: "spline",
      marker: {
        enabled: false,
      },
      states: {
        hover: {
          enabled: false, // Disable markers on hover
        },
      },
      lineWidth: 3.5,
      name: "Republican Chance of Winning",
      data: dateTimeStamps.map((timestamp, index) => [
        timestamp,
        repWinPercents[index],
      ]), // Combine timestamps with data
      color: "#B83C2B",
    },
  ];

  // Conditionally include ties data, based on whether includeTies is true
  if (includeTies) {
    seriesData.push({
      type: "spline",
      marker: {
        enabled: false,
      },
      states: {
        hover: {
          enabled: false, // Disable markers on hover
        },
      },
      lineWidth: 3.5,
      name: "Tie Chance",
      data: dateTimeStamps.map((timestamp, index) => [
        timestamp,
        tiePercents[index],
      ]), // Combine timestamps with data
      color: "#505050",
    });
  }

  useLayoutEffect(() => {
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
          // don't display the year
          month: "%b",
        },
        title: {
          text: "Month",
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
        crosshair: {
          width: 1,
          color: "black",
          dashStyle: "ShortDash", // Change to dashed line
          label: {
            enabled: false, // Disable crosshair label
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
            fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
          },
        },
        labels: {
          style: {
            color: "black",
            fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
          },
          formatter: function () {
            return this.value + "%"; // Append '%' to each label
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
            date = Highcharts.dateFormat("%A, %B %d", this.x); // Get the day of the week only if this.x is valid
          }
          const demWinPercent = this.points ? this.points[0].y : null; // Get the Democratic win percentage
          const repWinPercent = this.points ? this.points[1].y : null; // Get the Republican win percentage
          const tiesPercent = this.points ? this.points[2]?.y : null; // Get the ties percentage if it exists

          let tooltip = `<b>${date}:</b><br> Democrats win <span style="color:#595D9A;">${
            demWinPercent !== null ? demWinPercent?.toFixed(0) : "N/A"
          }%</span> of the time<br> Republicans win <span style="color: #B83C2B;">${
            repWinPercent !== null ? repWinPercent?.toFixed(0) : "N/A"
          }%</span> of the time`;
          // Conditionally include ties information
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
  });
  return <div id="container6"></div>;
};

export default Historical;
