import Module from "../Module";
import styles from "./SliderModuleAlt.module.css";
import { Party } from "@/types/Party";
import React, { useState, useEffect, useRef, ErrorInfo } from 'react';
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

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
    constructor(props: {children: React.ReactNode}) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Slider error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h4>Something went wrong with the slider. Please refresh the page.</h4>;
        }

        return this.props.children;
    }
}

const SliderWrapper: React.FC<SliderModuleProps> = (props) => {
    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [props.raceType]);

    return (
        <ErrorBoundary key={key}>
            <SliderModuleAlt {...props} />
        </ErrorBoundary>
    );
};

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
            try {
                MySlider.current.$set({ values: [0] });
            } catch (error) {
                console.error("Error resetting slider:", error);
            }
        }
    }, [props.currentMargin, props.winner, props.raceType]);

    useEffect(() => {
        const createOrUpdateSlider = () => {
            if (node.current && !MySlider.current) {
                try {
                    MySlider.current = new RangeSlider({
                        target: node.current,
                        props: getSliderProps(),
                    });
                } catch (error) {
                    console.error("Error creating slider:", error);
                }
            } else if (MySlider.current) {
                try {
                    MySlider.current.$set(getSliderProps());
                } catch (error) {
                    console.error("Error updating slider:", error);
                }
            }

            if (MySlider.current) {
                try {
                    MySlider.current.$off('change', handleSliderChange);
                    MySlider.current.$on('change', handleSliderChange);
                } catch (error) {
                    console.error("Error setting slider event:", error);
                }
            }
        };

        createOrUpdateSlider();

        return () => {
            if (MySlider.current) {
                try {
                    MySlider.current.$destroy();
                } catch (error) {
                    console.error("Error destroying slider:", error);
                }
                MySlider.current = null;
            }
        };
    }, [props.raceType, props.marginChanges, props.winner, props.currentMargin, value]);

    const getSliderProps = () => ({
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
    });

    const handleSliderChange = (e: { detail: { value: any; }; }) => {
        if (!e || !e.detail || typeof e.detail.value === 'undefined') return;

        const currentFinance = e.detail.value;
        const stepSize = (props.raceType === RaceType.House ? 0.04 : 0.4);
        const index = Math.round((currentFinance / stepSize) + 50);
        const marginChange = props.marginChanges && props.marginChanges.length > index ? props.marginChanges[index] : 0;
        setMarginChange(marginChange);
        setValue(currentFinance);
        setCurrentFinance(currentFinance);
        setNewMargin((props.winner === Party.Democrat ? props.currentMargin : -1 * props.currentMargin) + marginChange);
    };

    // ... (rest of the component code remains the same)

    return (
        <Module>
            <h3>How can campaign contributions affect race outcomes?</h3>
            <div className={styles.finance}>
                <div className={styles.sliderContainer}>
                    <p>Drag the slider to simulate additional campaign contributions.</p>
                    <div 
                        className={styles.slider} 
                        ref={node} 
                        style={{
                            '--thumb-color': thumbColor
                        } as React.CSSProperties}
                    ></div>
                </div>
                {/* ... (rest of the JSX remains the same) */}
            </div>
        </Module>
    );
}

export default SliderWrapper;