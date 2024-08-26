import Module from "../Module";
import Finance from "@/components/dataviz/Finance";
import styles from "./FinanceModule.module.css";
import ExclamationMark from "../svgs/ExclamationMark";
import React, { useState, useEffect } from 'react';
import { RaceType } from "@/types/RaceType";

interface FinanceModuleProps {
    raceType: string;
    std: number;
    margins: number[];
    useFinance: boolean;
}

const FinanceModule: React.FC<FinanceModuleProps> = ({ raceType, std, margins, useFinance }) => {
    // Use state to manage the local copy of margins
    const [localMargins, setLocalMargins] = useState<number[]>([]);

    // useEffect to update localMargins when margins prop changes
    useEffect(() => {
        if (margins && Array.isArray(margins)) {
            setLocalMargins(margins);
        }
    }, [margins]); // Only re-run the effect if margins changes

    if (raceType !== RaceType.House && raceType !== RaceType.Senate) {
        return (
            <Module className="FinanceModule">
                <h3>How does raising money affect race outcomes?</h3>
                <div className={styles.exclamation}>
                <span className={styles.exclamationIcon}>
                    <ExclamationMark />
                </span>
                <span className={styles.exclamationText}>
                    <p>Please choose a House or Senate race to see the effect of fundraising on race outcomes.
                    </p>
                </span>
                </div>
                
            </Module>)
    }

    if (!useFinance) {
        return (
            <Module className="FinanceModule">
                <h3>How does raising money affect race outcomes?</h3>
                <div className={styles.exclamation}>
                <span className={styles.exclamationIcon}>
                    <ExclamationMark />
                </span>
                <span className={styles.exclamationText}>
                    <p>One or more candidates in this race have not reported their fundraising totals.
                    </p>
                </span>
                </div>
                
            </Module>)
    }
    

    return (
        <Module className="FinanceModule">
          <div className={styles.finance}>
            <h3>How does raising money affect race outcomes?</h3>
            <p>95% of outcomes fall within the range. Uncertainty will significantly decrease as the election gets closer. </p>
            {/* Use localMargins instead of margins directly */}
            <Finance raceType={raceType} std={std} margins={localMargins}/>
            
          </div>
        </Module>
    );
}

export default FinanceModule;