import Module from "../Module";
import styles from "./SliderModuleAlt.module.css";
import { Party } from "@/types/Party";
import React, { useState, useEffect, useRef } from 'react';
import { RaceType } from "@/types/RaceType";
import RangeSlider from 'svelte-range-slider-pips';
import { State } from "@/types/State";

interface SliderModuleProps {
    raceType: RaceType;
    currentMargin: number;
    winner: Party;
    std: number;
    marginChanges: number[];
    useFinance: boolean;
}

const SliderModuleAlt: React.FC<SliderModuleProps> = ({ raceType, std, winner, currentMargin, marginChanges, useFinance }) => {
    // Use state to manage the local copy of margins
    console.log("Current Margin is " + currentMargin)
    const [currentFinance, setCurrentFinance] = useState<number>(0);
    const [marginChange, setMarginChange] = useState<number>(0);
    const [newMargin, setNewMargin] = useState<number>(currentMargin);
      
    useEffect(() => {
        setNewMargin((winner == Party.Democrat ? 1 : -1) * currentMargin)
        setCurrentFinance(0)
    }, [currentMargin])

    function rgbToOklab({ r, g, b }) {
        const l = 0.4121656120 * r + 0.5362752080 * g + 0.0514575653 * b;
        const m = 0.2118591070 * r + 0.6807189584 * g + 0.1074065790 * b;
        const s = 0.0883097947 * r + 0.2818474174 * g + 0.6302613616 * b;
      
        const l_ = Math.cbrt(l);
        const m_ = Math.cbrt(m);
        const s_ = Math.cbrt(s);
      
        return {
          L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
          a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
          b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
        };
      }
      
      // Function to convert OKLab to RGB
      function oklabToRgb({ L, a, b }) {
        const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
        const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
        const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
      
        const l = l_ ** 3;
        const m = m_ ** 3;
        const s = s_ ** 3;
      
        return {
          r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
          g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
          b: -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
        };
      }
      
      // Function to interpolate between two colors in OKLab space
      function interpolateOklab(color1: { r: number; g: number; b: number; }, color2: { r: number; g: number; b: number; }, factor: number) {
        const c1 = rgbToOklab(color1);
        const c2 = rgbToOklab(color2);
        const result = {
          L: c1.L + (c2.L - c1.L) * factor,
          a: c1.a + (c2.a - c1.a) * factor,
          b: c1.b + (c2.b - c1.b) * factor
        };
        return oklabToRgb(result);
      }

        const [value, setValue] = useState(0);
        const $node = useRef();
        const MySlider = useRef();
        const [thumbColor, setThumbColor] = useState('rgb(255, 0, 0)'); // Initial color is red in RGB
      
        useEffect(() => {
          if (!MySlider.current) {
            MySlider.current = new RangeSlider({
              target: $node.current,
              props: { 
                values: [value],
                float: true,
                id: 'financeSlider',
                min: (raceType == RaceType.House ? -2 : -20),
                max: (raceType == RaceType.House ? 2 : 20) ,
                step: (raceType == RaceType.House ? 0.04 : .4),
                pips: true,
                pipstep: 20,
                all: "label",
                formatter: function(v: number, i: number, p: number) {
                  return ((v > 0 ? "D+" + "$" + v: v < 0 ? "R+" + "$" + Math.abs(v): "No change"))
                },
                range: false,
                springValues: {stiffness: 0.6, damping: 0.8}
              },
            })};
            MySlider.current.$on('change', (e) => {
              let currentFinance = e.detail.value
              let stepSize = (raceType == RaceType.House ? 0.04 : 0.4)
              let index = currentFinance / stepSize + 50
              let marginChange = marginChanges[Math.round(index)]
              setMarginChange(marginChange)
              setValue(currentFinance);
              setCurrentFinance(currentFinance);
              setNewMargin((winner == Party.Democrat ? currentMargin : -1 * currentMargin) + marginChange)
            });
        }, [currentMargin, marginChanges]);

        useEffect(() => {
          const gradient = [
            { stop: 0, color: { r: 184, g: 60, b: 43 } }, // red
            { stop: 100, color: { r: 89, g: 93, b: 154 } } // red
          ];
      
          const percentage = value;
          let newThumbColor = { r: 255, g: 255, b: 255 }; // default to red
          
          for (let i = 0; i < gradient.length - 1; i++) {
            const start = gradient[i];
            const end = gradient[i + 1];
            if (percentage >= start.stop && percentage <= end.stop) {
              const range = end.stop - start.stop;
              const rangePercent = (percentage - start.stop) / range;
              newThumbColor = interpolateOklab(start.color, end.color, rangePercent);
              break;
            }
          }
      
          const rgbString = `rgb(${Math.round(newThumbColor.r)}, ${Math.round(newThumbColor.g)}, ${Math.round(newThumbColor.b)})`;
          setThumbColor(rgbString);
        }, [value]);
      

    return (
        <Module>
          <h3>How can campaign contributions affect race outcomes?</h3>
          <div className={styles.finance}>
                <div className={styles.sliderContainer}>
                  <p>Drag the slider to simulate additional campaign contributions.</p>
                <div 
                className={styles.slider} 
                ref={$node} 
                style={{
                        '--thumb-color': thumbColor
                    }}
                    ></div>
                </div>
                <div className={styles.statement}>
                  <p>We predict that {currentFinance > 0 ? "Democrats raising" : currentFinance < 0 ? "Republicans raising" : "neither raising"}</p>
                  <h3>{currentFinance != 0 ? "$" + Math.abs(currentFinance) + " million more" : "any more money"}</h3>
                  <p>would {currentFinance > 0 ? "raise the Democratic" : currentFinance < 0 ? "raise the Republican" : "change the"} margin by</p>
                  <h3>{currentFinance != 0 ? {marginChange} + "points." : "0 points"}</h3>
                </div>
                <div className={styles.metrics}>
                  <div>
                    <p>Original Margin</p>
                    <div>
                      { /*<NewMargin />*/ }
                      <p>
                      <b>
                        {winner == Party.Republican ? "R+" : winner == Party.Democrat ? "D+" : "Tie"}
                        {currentMargin !== 0 && currentMargin}
                      </b>
                    </p>
                    </div>
                  </div>
                  <div>
                    <p>New Margin</p>
                    <div>
                    { /*<NewMargin />*/ }
                      <p><b>
                        {newMargin > 0 ? "D+" : newMargin < 0 ? "R+" : "Tie"}
                        {newMargin !== 0 && Math.abs(parseFloat(newMargin.toFixed(1)))}
                      </b></p>
                    </div>
                  </div>
                </div>
          </div>
        </Module>
    );
}

export default SliderModuleAlt;