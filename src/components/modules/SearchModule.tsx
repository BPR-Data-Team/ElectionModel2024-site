// SearchModule.tsx

import React, { useState, ChangeEvent } from 'react';
import Module from "../Module";
import styles from "./SearchModule.module.css";

const raceOptions = ['presidential', 'Senate', 'House', 'gubernational', 'State Legislature'];
const stateOptions = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

export default function SearchModule(): JSX.Element {
    const [selectedRace, setSelectedRace] = useState<string>("presidential");
    const [selectedState, setSelectedState] = useState<string | null>(null);

    const handleRaceChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        setSelectedRace(event.target.value);
    }
    const handleStateChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        setSelectedState(event.target.value);
    };

    return (
        <Module>
            <div className={styles.search}>
                <p className={styles.searchText}>
                    I want to see
                    <select className={styles.dropdown} value={selectedRace} onChange={handleRaceChange}>
                        {raceOptions.map((race, index) => (
                            <option key={index} value={race}>{race}</option>
                        ))}
                    </select>
                    races in
                    <select className={styles.dropdown} value={selectedState || ''} onChange={handleStateChange}>
                        <option value="">Select State</option>
                        {stateOptions.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                </p>
            </div>
        </Module>
    );
}
