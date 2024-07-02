import { RaceType } from "@/types/RaceType";
import Highcharts from "highcharts";
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);


import { useLayoutEffect } from "react";

interface FinanceProps {
    raceType: string;
    std: number;
    margins: number[];
}

const Finance: React.FC<FinanceProps> = (props: FinanceProps) => {
    const range_array = props.margins.map((mgn) => [
        parseFloat(mgn.toFixed(1)), 
        parseFloat((mgn - 1.96*props.std).toFixed(1)), 
        parseFloat((mgn + 1.96*props.std).toFixed(1))]);

    const money_break = props.raceType == RaceType.Senate ? 0.4 : 0.04;
    const money_array = Array.from({ length: range_array.length }, (_, i) => (i - (range_array.length - 1) / 2) * money_break);

    const data_range = range_array.map((mgn, i) => [money_array[i], mgn[1], mgn[2]]);
    const data_line = props.margins.map((mgn, i) => [money_array[i], mgn]);

    let max_abs_data = Math.max(...data_range.map((mgn) => Math.abs(mgn[1])), ...data_range.map((mgn) => Math.abs(mgn[2])));
    max_abs_data = max_abs_data > 30 ? max_abs_data : 30;

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
            formatter: function (this: any) {
              if (this.value < 0) {
                return `R+${Math.abs(this.value)}`;
              }
              if (this.value > 0) {
                return `D+${Math.abs(this.value)}`;
              }
              return "No change";
            },
            style: {
              color: "black",
              fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
            },
          },
        },
        yAxis: {
            min: -1 * max_abs_data,
            max: max_abs_data,
          title: {
            text: 'Expected Margin',
            style: {
              color: "black",
              fontSize: "18px",
              fontFamily: "gelica, book antiqua, georgia, times new roman, serif",
            },
          },
          labels: {
            formatter: function (this: any) {
              if (this.value < 0) {
                return `R+${Math.abs(this.value)}`;
              }
              if (this.value > 0) {
                return `D+${Math.abs(this.value)}`;
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
                formatter: function () {
                    let margin = this.point.low && this.point.high ? (this.point.low + this.point.high) / 2 : 0;
                    margin = parseFloat(margin.toFixed(1));
                    let money = this.x && typeof this.x == "number" ? this.x : 0;
                    let party = money < 0 ? "Republicans" : money > 0 ? "Democrats" : "neither Democrats nor Republicans";
                    money = parseFloat((Math.abs(money) * (RaceType.Senate ? 1 : 0.1)).toFixed(1));
                    
                        return `If ${party + " raise "}
                        ${money == 0 ? "any more money" : "$" + money + " million more in this race" }, <br> we predict that 
                        the margin will be <b>${margin < 0 ? "R+" + Math.abs(margin) : margin > 0 ? "D+" + margin : "a tie"}</b>`;
                },
        },
        credits: {
          enabled: false,
        },
        series: [{
          name: 'Value Range',
          data: data_range,
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
            name: 'Expected Margin',
            data: data_line,
            zIndex: 2,
            type: 'line',
            marker: {
                enabled: true,
                symbol: 'circle',
                radius: 3,
            }
            
        }],
      };
      
      Highcharts.chart('container8', options);
      });
      return <div id="container8"></div>;
    };
    
  

export default Finance;