import { RaceType } from "@/types/RaceType";
import Highcharts from "highcharts";
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);


import { State } from "@/types/State";
import { useLayoutEffect } from "react";

interface FinanceProps {
    raceType: string;
    std: number;
    margins: number[];
}

const Finance: React.FC<FinanceProps> = (props: FinanceProps) => {

    const range_array = props.margins.map((mgn) => [mgn, mgn - 1.96*props.std, mgn + 1.96*props.std]);
    const money_break = props.raceType == RaceType.Senate ? 10 : 1;
    const money_array = Array.from({ length: range_array.length }, (_, i) => (i - (range_array.length - 1) / 2) * money_break);


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
          title: {
            text: 'Additional Funding Raised (in Millions of $)', 
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
          min: -50, 
          max: 50,
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
          data: range_array,
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
        }],
      };
      
      Highcharts.chart('container6', options);
      });
      return <div id="container6"></div>;
    };
    
  

export default Finance;