import React, { useState, ChangeEvent } from "react";
import Module from "../Module";
import styles from "./SearchModule.module.css";
import { RaceType } from "@/types/RaceType";
import { State } from "@/types/State";

export interface SearchModuleProps {
  raceType: RaceType;
  state: State;
  setRaceType: (raceType: RaceType) => void;
  setState: (state: State) => void;
}

export default function SearchModule(props: SearchModuleProps): JSX.Element {
  const handleRaceChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const raceTypeKey = event.target.value as keyof typeof RaceType;
    if (RaceType[raceTypeKey]) {
      props.setRaceType(RaceType[raceTypeKey]);
    } else {
      console.error("Invalid race type selected");
    }
  };
  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const stateValue = event.target.value.replace(
      /\s/g,
      ""
    ) as keyof typeof State;
    if (State[stateValue]) {
      props.setState(State[stateValue]);
      if (props.state === State.National) {
        if (props.raceType === RaceType.gubernational) {
          props.setRaceType(RaceType.presidential);
        }
      }
    } else {
      console.error("Invalid state selected");
    }
  };

  return (
    <Module>
      <div className={styles.search}>
        <p>
          I want to see
          <select value={props.raceType} onChange={handleRaceChange}>
            {Object.values(RaceType).map((race, index) => (
              <option key={index} value={race}>
                {race}
              </option>
            ))}
          </select>
          races in
          <select value={props.state} onChange={handleStateChange}>
            {Object.values(State).map((state, index) => (
              <option key={index} value={state}>
                {state === State.National ? "the nation" : state}
              </option>
            ))}
          </select>
        </p>
      </div>
    </Module>
  );
}
