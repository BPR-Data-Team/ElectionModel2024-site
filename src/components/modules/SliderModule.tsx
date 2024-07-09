import Module from "../Module";
import styles from "./SliderModule.module.css";
import React, { useState, useEffect } from 'react';
import { RaceType } from "@/types/RaceType";

interface SliderModuleProps {
    raceType: string;
    std: number;
    margins: number[];
    useFinance: boolean;
}

const SliderModule: React.FC<SliderModuleProps> = ({ raceType, std, margins, useFinance }) => {
    // Use state to manage the local copy of margins
    const [localMargins, setLocalMargins] = useState<number[]>([]);

    // useEffect to update localMargins when margins prop changes
    useEffect(() => {
        if (margins && Array.isArray(margins)) {
            setLocalMargins(margins);
        }
    }, [margins]); // Only re-run the effect if margins changes    
      
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
      function interpolateOklab(color1, color2, factor) {
        const c1 = rgbToOklab(color1);
        const c2 = rgbToOklab(color2);
        const result = {
          L: c1.L + (c2.L - c1.L) * factor,
          a: c1.a + (c2.a - c1.a) * factor,
          b: c1.b + (c2.b - c1.b) * factor
        };
        return oklabToRgb(result);
      }

        const [value, setValue] = useState(50);
        const [thumbColor, setThumbColor] = useState('rgb(255, 0, 0)'); // Initial color is red in RGB
      
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
      
        const handleInputChange = (e) => {
          setValue(e.target.value);
        };

    return (
        <Module>
          <div className={styles.finance}>
            <h3>How can campaign contributions affect race outcomes?</h3>
                <div className={styles.sliderContainer}>
                    <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={handleInputChange}
                    style={{
                        '--thumb-color': thumbColor
                    }}
                    />
                          <div className={styles.labels}>
        <span className={styles.label}>0</span>
        <span className={styles.label}>20</span>
        <span className={styles.label}>40</span>
        <span className={styles.label}>80</span>
        <span className={styles.label}>100</span>
      </div>
                </div>
          </div>
        </Module>
    );
}

export default SliderModule;