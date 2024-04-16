import React, { useState, ChangeEvent } from "react";
import Module from "../Module";
import styles from "./SearchModule.module.css";
import { RaceType, raceOptions } from "@/types/RaceType";
import { State, stateOptions } from "@/types/State";

export interface SearchModuleProps {
  raceType: RaceType;
  state: State;
  setRaceType: (raceType: RaceType) => void;
  setState: (state: State) => void;
}

export default function SearchModule(props: SearchModuleProps): JSX.Element {
  const handleRaceChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    props.setRaceType(event.target.value);
  };
  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    props.setState(event.target.value);
  };

  return (
    <Module>
      <div className={styles.search}>
        <p>
          I want to see
          <select value={props.raceType} onChange={handleRaceChange}>
            {raceOptions.map((race, index) => (
              <option key={index} value={race}>
                {race}
              </option>
            ))}
          </select>
          races in
          <select value={props.state} onChange={handleStateChange}>
            <option value="">Select State</option>
            {stateOptions.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </p>
      </div>
    </Module>
  );
}
