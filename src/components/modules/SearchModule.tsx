import React, { useState, ChangeEvent, useEffect } from "react";
import Module from "../Module";
import styles from "./SearchModule.module.css";
import { RaceType } from "@/types/RaceType";
import {
  State,
  getGubernatorialRaceStates,
  getNumDistricts,
  getSenateRaceStates,
} from "@/types/State";

export interface SearchModuleProps {
  raceType: RaceType;
  state: State;
  district: number;
  setRaceType: (raceType: RaceType) => void;
  setState: (state: State) => void;
  setDistrict: (district: number) => void;
}

export default function SearchModule(props: SearchModuleProps): JSX.Element {
  const [filteredStates, setFilteredStates] = useState<State[]>([]);
  const [maxDistricts, setMaxDistricts] = useState<number>(0);

  useEffect(() => {
    if (!filteredStates.includes(props.state)) {
      props.setState(filteredStates[0]);
    }
  }, [filteredStates]);

  useEffect(() => {
    switch (props.raceType) {
      case RaceType.Senate:
        setFilteredStates(getSenateRaceStates());
        break;
      case RaceType.gubernational:
        setFilteredStates(getGubernatorialRaceStates());
        break;
      default:
        setFilteredStates(Object.values(State));
        break;
    }
  }, [props.raceType]);

  // If the user changes the state to "the nation" while viewing gubernatorial predictions, switch to presidential predictions
  useEffect(() => {
    if (
      props.state === State.National &&
      props.raceType === RaceType.gubernational
    ) {
      props.setRaceType(RaceType.presidential);
    }
  }, [props.state, props.raceType]);

  useEffect(() => {
    setMaxDistricts(getNumDistricts(props.state));
  }, [props.state]);

  useEffect(() => {
    if (props.district > maxDistricts || props.district === 0) {
      props.setDistrict(maxDistricts);
    }
  }, [props.district, maxDistricts]);

  const handleRaceChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const raceTypeKey = event.target.value as keyof typeof RaceType;
    if (RaceType[raceTypeKey]) {
      props.setRaceType(RaceType[raceTypeKey]);
    } else {
      console.error(`Invalid race type selected: ${event.target.value}`);
    }
  };

  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const stateValue = event.target.value.replace(
      /\s/g,
      ""
    ) as keyof typeof State; // Removes whitespace from state value (e.g. "New York" => "NewYork")

    if (State[stateValue]) {
      props.setState(State[stateValue]);
    } else {
      console.error(`Invalid state selected: ${event.target.value}`);
    }
  };

  const handleDistrictChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const district = parseInt(event.target.value);
    if (district >= 0) {
      props.setDistrict(district);
    } else {
      console.error(`Invalid district number: ${event.target.value}`);
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
            {filteredStates.map((state, index) => (
              <option key={index} value={state}>
                {state === State.National ? "the nation" : state}
              </option>
            ))}
          </select>
          {props.raceType === RaceType.House &&
            props.state !== State.National && (
              <select
                value={props.district}
                onChange={handleDistrictChange}
                disabled={maxDistricts === 1}
              >
                {Array.from({ length: maxDistricts }, (_, i) => i + 1).map(
                  (district) => (
                    <option key={district} value={district}>
                      {maxDistricts === 1
                        ? "at-large district"
                        : `District ${district}`}
                    </option>
                  )
                )}
              </select>
            )}
        </p>
      </div>
    </Module>
  );
}
