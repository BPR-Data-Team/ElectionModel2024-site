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
  dates: string[];
  winPercents: number[];
  state: State;
}

const Historical: React.FC<HistoricalProps> = (props: HistoricalProps) => {
  // Example data for each month from June to November
  const data = [
    { date: '05/07/2024', value: -1.13721096265648, lower_margin: -4.13721096265648, upper_margin: 1.86278903734352 },
    { date: '05/09/2024', value: -1.74350744767703, lower_margin: -4.74350744767703, upper_margin: 1.25649255232297 },
    { date: '05/10/2024', value: -0.917901585385638, lower_margin: -3.917901585385638, upper_margin: 2.082098414614362 },
    { date: '05/11/2024', value: -1.17988121935904, lower_margin: -4.17988121935904, upper_margin: 1.82011878064096 },
    { date: '05/12/2024', value: -0.627205066825754, lower_margin: -3.627205066825754, upper_margin: 2.372794933174246 },
    { date: '05/13/2024', value: -1.97171896203809, lower_margin: -4.97171896203809, upper_margin: 1.02828103796191 },
    { date: '05/14/2024', value: -0.269566392559847, lower_margin: -3.269566392559847, upper_margin: 2.730433607440153 },
    { date: '05/15/2024', value: -0.77213593633832, lower_margin: -3.77213593633832, upper_margin: 2.22786406366168 },
    { date: '05/16/2024', value: -1.72724748965443, lower_margin: -4.72724748965443, upper_margin: 1.27275251034557 },
    { date: '05/17/2024', value: -1.06327993460357, lower_margin: -4.06327993460357, upper_margin: 1.93672006539643 },
    { date: '05/18/2024', value: -1.81451675378786, lower_margin: -4.81451675378786, upper_margin: 1.18548324621214 },
    { date: '05/19/2024', value: -1.26201476711841, lower_margin: -4.26201476711841, upper_margin: 1.73798523288159 },
    { date: '05/20/2024', value: -1.25198771080944, lower_margin: -4.25198771080944, upper_margin: 1.74801228919056 },
    { date: '05/21/2024', value: -0.973170109394529, lower_margin: -3.973170109394529, upper_margin: 2.026829890605471 },
    { date: '05/22/2024', value: -0.950949052034799, lower_margin: -3.950949052034799, upper_margin: 2.049050947965201 },
    { date: '05/23/2024', value: -0.952376197318302, lower_margin: -3.952376197318302, upper_margin: 2.047623802681698 },
    { date: '05/24/2024', value: -0.996793587075728, lower_margin: -3.996793587075728, upper_margin: 2.003206412924272 },
    { date: '05/25/2024', value: -1.14845669979626, lower_margin: -4.14845669979626, upper_margin: 1.85154330020374 },
    { date: '05/26/2024', value: -1.11775000098481, lower_margin: -4.11775000098481, upper_margin: 1.88224999901519 },
    { date: '05/27/2024', value: -1.15205229162072, lower_margin: -4.15205229162072, upper_margin: 1.84794770837928 },
    { date: '05/28/2024', value: -1.1565511938274, lower_margin: -4.1565511938274, upper_margin: 1.8434488061726 },
    { date: '05/29/2024', value: -1.10925578224897, lower_margin: -4.10925578224897, upper_margin: 1.89074421775103 },
    { date: '05/30/2024', value: -1.09835729356252, lower_margin: -4.09835729356252, upper_margin: 1.90164270643748 },
    { date: '05/31/2024', value: -1.08955497611523, lower_margin: -4.08955497611523, upper_margin: 1.91044502388477 },
    { date: '06/01/2024', value: -1.1835852885533, lower_margin: -4.1835852885533, upper_margin: 1.8164147114467 },
    { date: '06/02/2024', value: -1.1462303796929, lower_margin: -4.1462303796929, upper_margin: 1.8537696203071 }]

    const averages = data.map(entry => parseFloat(entry.value.toFixed(1)));
    const ranges = data.map(entry => [parseFloat(entry.lower_margin.toFixed(1)), parseFloat(entry.upper_margin.toFixed(1))]);
    const dates = data.map(entry => entry.date);
  
    useLayoutEffect(() => {
      const options: Highcharts.Options = {
        chart: {
          type: 'arearange',
        },
        title: {
          text: '',
        },
        xAxis: {
          crosshair: {
            width: 0.2, 
            color: 'black', 
            label: {
              enabled: false // Disable crosshair label
            }
          },
          categories: dates,
          type: 'datetime',
          dateTimeLabelFormats: {
            day: '%m\%d\%Y'
          },
          title: {
            text: 'Month', 
            style: {
              color: "black",
              fontSize: "18px",
              fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
            },
          }, 
          labels: {
            formatter: function() {
               let date = new Date(this.value);
               if (date.getDate() == 1) {
                return new Date(this.value).toLocaleString('default', { month: 'short' })
               } else{
                return ""
               }
          },
          style: {
            color: "black",
            fontSize: "18px",
            fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
          },
        },
        },
        yAxis: {
          min: -10, 
          max: 10,
          title: {
            text: 'Margin',
            style: {
              color: "black",
              fontSize: "18px",
              fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
            },
          },
          labels: {
            formatter: function (this: any) {
              if (props.state === State.National) {
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
        plotOptions: {
          arearange: {
            color: '#595D9A',
            negativeColor: '#B83C2B',
          },
          line: {
            color: '#000000',
          }, 
          series: {
            showInLegend: false,
          }
        },
        tooltip: {
          shared: true,  
          formatter: function() {

            let tooltipContent = "";

            tooltipContent += '<b><span style="color: #595D9A;">D Overperformance:</span></b> ';

            let dem = ""
            if (this.point.high && this.point.high > 0) {
              dem += `D+${this.point.high}`;
            } else if (this.point.high && this.point.high < 0) {
              dem += `R+${-1*this.point.high}`;
            } else {
              dem += 'Tie';
            }
            
            tooltipContent += dem;
            
            tooltipContent += '<br><b>Median Margin:</b> ';
    
            if (this.points && this.points[1].y && this.points[1].y > 0) {
              tooltipContent += `D+${this.points[1].y}`;
            } else if (this.points && this.points[1].y && this.points[1].y < 0) {
              tooltipContent += `R+${-1*this.points[1].y}`;
            } else {
              tooltipContent += 'Tie';
            }

            tooltipContent += '<br><b><span style="color: #B83C2B;">R Overperformance:</span></b> ';
            
            let range = "";
            if (this.point.low && this.point.low > 0) {
              range += `D+${this.point.low}`;
            } else if (this.point.low && this.point.low < 0) {
              range += `R+${-1*this.point.low}`;
            } else {
              range += 'Tie';
            }

            tooltipContent += range;
            
            
            return tooltipContent;
          },
        },
        credits: {
          enabled: false,
        },
        series: [{
          name: 'Value Range',
          data: ranges,
          zIndex: 1,
          fillOpacity: 0.5,
          type: 'arearange',
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false // Disable markers on hover
              }
            }
          }          
        }, {
          name: 'Margin',
          data: averages,
          type: 'line',
          zIndex: 2,
          
        }],
      };
      
      Highcharts.chart('container6', options);
      });
      return <div id="container6"></div>;
    };
    
  

export default Historical;