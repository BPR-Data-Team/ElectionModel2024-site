import { Party, getOppositeParty, getPartyColor } from "@/types/Party";
import { RaceType } from "@/types/RaceType";
import Highcharts from "highcharts";
import HighchartsMore from 'highcharts/highcharts-more';
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
  
  const dates = [
    "2023-01-01", "2023-01-08", "2023-01-15", "2023-01-22", "2023-01-29",
    "2023-02-05", "2023-02-12", "2023-02-19", "2023-02-26", "2023-03-05",
    "2023-03-12", "2023-03-19", "2023-03-26", "2023-04-02", "2023-04-09",
    "2023-04-16", "2023-04-23", "2023-04-30", "2023-05-07", "2023-05-14",
    "2023-05-21", "2023-05-28", "2023-06-04", "2023-06-11", "2023-06-18",
    "2023-06-25", "2023-07-02", "2023-07-09", "2023-07-16", "2023-07-23",
    "2023-07-30", "2023-08-06", "2023-08-13", "2023-08-20", "2023-08-27",
    "2023-09-03", "2023-09-10", "2023-09-17", "2023-09-24", "2023-10-01",
    "2023-10-08", "2023-10-15", "2023-10-22", "2023-10-29", "2023-11-05",
    "2023-11-12", "2023-11-19", "2023-11-26", "2023-12-03", "2023-12-10",
    "2023-12-17", "2023-12-24", "2023-12-31", "2024-01-07", "2024-01-14",
    "2024-01-21", "2024-01-28", "2024-02-04", "2024-02-11", "2024-02-18",
    "2024-02-25", "2024-03-03", "2024-03-10", "2024-03-17", "2024-03-24",
    "2024-03-31", "2024-04-07", "2024-04-14", "2024-04-21", "2024-04-28",
    "2024-05-05", "2024-05-12", "2024-05-19", "2024-05-26", "2024-06-02",
    "2024-06-09", "2024-06-16", "2024-06-23", "2024-06-30", "2024-07-07",
    "2024-07-14", "2024-07-21", "2024-07-28", "2024-08-04", "2024-08-11",
    "2024-08-18", "2024-08-25", "2024-09-01", "2024-09-08", "2024-09-15",
    "2024-09-22", "2024-09-29", "2024-10-06", "2024-10-13", "2024-10-20",
    "2024-10-27", "2024-11-03", "2024-11-10", "2024-11-17", "2024-11-24",
    "2024-12-01", "2024-12-08", "2024-12-15", "2024-12-22", "2024-12-29"
  ];

  const dateTimeStamps = dates.map(date => new Date(date).getTime());
  const numValues = 100
  const demWinPercents: number[] = [];
  const repWinPercents: number[] = [];

  for (let i = 0; i < numValues; i++) {
    // Generate random Democratic win percentages between 40 and 60 using a normal distribution
    const demWinPercent = Math.min(Math.max(Math.random() * 20 + 40, 40), 60);
    demWinPercents.push(demWinPercent);
    // Republican win percent is the complement of the Democratic percentage
    repWinPercents.push(100 - demWinPercent);
  }
  const tiePercents = Array(100).fill(1);

  // Exampled data finished
  
  const includeTies = props.state == State.National && (props.raceType == RaceType.Presidential || props.raceType == RaceType.Senate) ; // Only include ties for pres/senate national

  //Need to define seriesData outside of the layout effect because of includeTies
  const seriesData: Highcharts.SeriesOptionsType[] = [{
    type: 'spline',
    marker: {
      enabled: false,
      states: {
        hover: {
          enabled: false // Disable markers on hover
        }
      },
    },
    lineWidth: 3.5,
    name: 'Democratic Chance of Winning',
    data: dateTimeStamps.map((timestamp, index) => [timestamp, demWinPercents[index]]), // Combine timestamps with data
    color: '#595D9A' // Customize color for Democratic line
}, {
    type: 'spline',
    marker: {
      enabled: false,
    },
    states: {
      hover: {
        enabled: false // Disable markers on hover
      }
    },
    lineWidth: 3.5,
    name: 'Republican Chance of Winning',
    data: dateTimeStamps.map((timestamp, index) => [timestamp, repWinPercents[index]]), // Combine timestamps with data
    color: '#B83C2B'
}]

// Conditionally include ties data, based on whether includeTies is true
if (includeTies) { 
  seriesData.push({
    type: 'spline',
    marker: {
      enabled: false,
    },
    states: {
      hover: {
        enabled: false // Disable markers on hover
      }
    },
    lineWidth: 3.5,
    name: 'Tie Chance',
    data: dateTimeStamps.map((timestamp, index) => [timestamp, tiePercents[index]]), // Combine timestamps with data
    color: '#505050'
  });
}



  useLayoutEffect(() => {
    const options: Highcharts.Options = {
      chart: {
        type: 'spline', 
        style: {
          fontFamily: "gelica, book antiqua, georgia, times new roman, serif"
      },
    },
    title: {
        text: ''
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          // don't display the year
          month: '%b'
        },
        title: {
            text: 'Month', 
            style: {
              color: "black",
              fontSize: "18px",
              fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
          } 
        }, 
        labels: {
          style: {
              color: "black",
              fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
          }
      },
      crosshair: {
        width: 0.2, 
        color: 'black', 
        label: {
          enabled: false // Disable crosshair label
        }
      }, 
    },
    yAxis: {
      min: 0,
      max: 100,
        title: {
            text: 'Win Percentage', 
            style: {
              color: "black",
              fontSize: "18px",
              fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
          }
        }, 
        labels: {
          style: {
              color: "black",
              fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
          }
      } 
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      formatter: function() {
        let date = this.x;
        if (typeof this.x == "number") {
            date = Highcharts.dateFormat('%A, %B %d', this.x); // Get the day of the week only if this.x is valid
        }        
        const demWinPercent = this.points? this.points[0].y : null; // Get the Democratic win percentage
        const repWinPercent = this.points? this.points[1].y : null; // Get the Republican win percentage
        const tiesPercent = this.points ? this.points[2]?.y : null; // Get the ties percentage if it exists

        let tooltip = `<b>${date}:</b><br> Democrats win <span style="color:#595D9A;">${demWinPercent !== null ? demWinPercent?.toFixed(0) : 'N/A'}%</span> of the time<br> Republicans win <span style="color: #B83C2B;">${repWinPercent !== null ? repWinPercent?.toFixed(0) : 'N/A'}%</span> of the time`;
        // Conditionally include ties information
        if (includeTies) {
          tooltip += `<br> Ties occur <span style="color:#505050;">${tiesPercent?.toFixed(0)}%</span> of the time`;
        }
        return tooltip;
      },
      shared: true,
    },
    series: seriesData,
    }

      Highcharts.chart('container6', options);
      });
      return <div id="container6"></div>;
    };
    
  

export default Historical;