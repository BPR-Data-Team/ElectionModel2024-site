import Module from "../Module";
import styles from "./SliderModuleAlt.module.css";
import { Party } from "@/types/Party";
import React, { useState, useEffect, useRef } from 'react';
import { RaceType } from "@/types/RaceType";
import RangeSlider from 'svelte-range-slider-pips';
import Image from "next/image";
import oldMarginIcon from "image-assets/oldMagin.svg"
import newMarginIcon from "image-assets/newMargin.svg"

interface SliderModuleProps {
    raceType: RaceType;
    currentMargin: number;
    winner: Party;
    std: number;
    marginChanges: number[];
    useFinance: boolean;
}

const SliderModuleAlt: React.FC<SliderModuleProps> = (props: SliderModuleProps) => {
    const [currentFinance, setCurrentFinance] = useState<number>(0);
    const [marginChange, setMarginChange] = useState<number>(0);
    const [newMargin, setNewMargin] = useState<number>(props.currentMargin);

    const [value, setValue] = useState(0);
    const node = useRef<HTMLDivElement | null>(null);
    const MySlider = useRef<RangeSlider | null>(null);
    const [thumbColor, setThumbColor] = useState('rgb(255, 0, 0)');

    useEffect(() => {
        setNewMargin((props.winner === Party.Democrat ? 1 : -1) * props.currentMargin);
        setCurrentFinance(0);
        setValue(0);
        if (MySlider.current) {
            MySlider.current.$set({ values: [0] });
        }
    }, [props.currentMargin, props.winner, props.raceType]);

    const handleSliderChange = (e: { detail: { value: any; }; }) => {
        const currentFinance = e.detail.value;
        const stepSize = (props.raceType === RaceType.House ? 0.04 : 0.4);
        const index = Math.round((currentFinance / stepSize) + 50);
        const marginChange = props.marginChanges && props.marginChanges.length > index ? props.marginChanges[index] : 0;
        setMarginChange(marginChange);
        setValue(currentFinance);
        setCurrentFinance(currentFinance);
        setNewMargin((props.winner === Party.Democrat ? props.currentMargin : -1 * props.currentMargin) + marginChange);
    };

    useEffect(() => {
        if (node.current && !MySlider.current) {
            MySlider.current = new RangeSlider({
                target: node.current,
                props: {
                    values: [value],
                    float: true,
                    id: 'financeSlider',
                    min: (props.raceType === RaceType.House ? -2 : -20),
                    max: (props.raceType === RaceType.House ? 2 : 20),
                    step: (props.raceType === RaceType.House ? 0.04 : 0.4),
                    pips: true,
                    pipstep: ((props.raceType === RaceType.House ? 2 : 20) - (props.raceType === RaceType.House ? -2 : -20)) / (props.raceType === RaceType.House ? 0.04 : 0.4) / 4,
                    all: "label",
                    formatter: function (v: number) {
                        return ((v > 0 ? "D+" + "$" + v + "m" : v < 0 ? "R+" + "$" + Math.abs(v) + "m" : "No change"));
                    },
                    range: false,
                    springValues: { stiffness: 0.6, damping: 0.8 }
                },
            });

            MySlider.current.$on('change', handleSliderChange);
        } else if (MySlider.current) {
            // Update the existing slider's properties
            MySlider.current.$set({
                min: (props.raceType === RaceType.House ? -2 : -20),
                max: (props.raceType === RaceType.House ? 2 : 20),
                step: (props.raceType === RaceType.House ? 0.04 : 0.4),
                pipstep: ((props.raceType === RaceType.House ? 2 : 20) - (props.raceType === RaceType.House ? -2 : -20)) / (props.raceType === RaceType.House ? 0.04 : 0.4) / 4,
                values: [value],
            });
            
            // Re-attach the event listener
            MySlider.current.$on('change', handleSliderChange);
        }
    }, [props.raceType, props.marginChanges, props.winner, props.currentMargin, value]);

    useEffect(() => {
        const min = (props.raceType === RaceType.House ? -2 : -20);
        const max = (props.raceType === RaceType.House ? 2 : 20);
        const range = max - min;
        const percentage = (value - min) / range * 100;
        const gradient = [
            { stop: 0, color: { r: 184, g: 60, b: 43 } },
            { stop: 100, color: { r: 89, g: 93, b: 154 } }
        ];

        let newThumbColor = { r: 255, g: 255, b: 255 };

        for (let i = 0; i < gradient.length - 1; i++) {
            const start = gradient[i];
            const end = gradient[i + 1];
            if (percentage >= start.stop && percentage <= end.stop) {
                const range = end.stop - start.stop;
                const rangePercent = (percentage - start.stop) / range;
                newThumbColor = interpolateRgb(start.color, end.color, rangePercent);
                break;
            }
        }

        const rgbString = `rgb(${Math.round(newThumbColor.r)}, ${Math.round(newThumbColor.g)}, ${Math.round(newThumbColor.b)})`;
        setThumbColor(rgbString);
    }, [value, props.raceType]);

    function interpolateRgb(color1: { r: number; g: number; b: number }, color2: { r: number; g: number; b: number }, factor: number) {
        return {
            r: color1.r + (color2.r - color1.r) * factor,
            g: color1.g + (color2.g - color1.g) * factor,
            b: color1.b + (color2.b - color1.b) * factor
        };
    }

    return (
        <Module>
            <h3>How can campaign contributions affect race outcomes?</h3>
            <div className={styles.finance}
            style={{
              '--thumb-color': thumbColor
          } as React.CSSProperties}>
                <div className={styles.sliderContainer}>
                    <p>Drag the slider to simulate additional campaign contributions.</p>
                    <div 
                        className={styles.slider} 
                        ref={node} 
                    ></div>
                <div className={styles.metricsUnder}>
                    <div>
                        <p>Original Margin</p>
                        <div>
                          <Image src={oldMarginIcon} width={20} height={20} alt="" />
                            <p>
                                <b>
                                    {props.currentMargin === 0 ? "Tie" : props.winner === Party.Republican ? "R+" : "D+"}
                                    {props.currentMargin !== 0 && props.currentMargin}
                                </b>
                            </p>
                        </div>
                    </div>
                    <div>
                        <p>New Margin</p>
                        <div>
                        <Image src={newMarginIcon} width={20} height={20} alt="" />
                            <p><b>
                                {newMargin > 0 ? "D+" : newMargin < 0 ? "R+" : "Tie"}
                                {newMargin !== 0 && Math.abs(parseFloat(newMargin.toFixed(1)))}
                            </b></p>
                        </div>
                    </div>
                </div>
                </div>
                <div className={styles.statement}>
                    <p>We predict that {currentFinance > 0 ? "Democrats raising" : currentFinance < 0 ? "Republicans raising" : "neither party raising"}</p>
                    <h3>{currentFinance !== 0 ? "$" + Math.abs(currentFinance) + " million more" : "any more money"}</h3>
                    <p>would {currentFinance > 0 ? "raise the Democratic" : currentFinance < 0 ? "raise the Republican" : "change the"} margin by</p>
                    <h3>{currentFinance !== 0 ? Math.abs(marginChange) + " points." : "0 points."}</h3>
                    <p className={styles.asterisk}>*All else remaining the same</p>
                </div>
                <div className={styles.metricsSeparate}>
                    <div>
                        <p>Original Margin</p>
                        <div>
                          <Image src={oldMarginIcon} width={20} height={20} alt="" />
                            <p>
                                <b>
                                    {props.winner === Party.Republican ? "R+" : props.winner === Party.Democrat ? "D+" : "Tie"}
                                    {props.currentMargin !== 0 && props.currentMargin}
                                </b>
                            </p>
                        </div>
                    </div>
                    <div>
                        <p>New Margin</p>
                        <div>
                        <Image src={newMarginIcon} width={20} height={20} alt="" />
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