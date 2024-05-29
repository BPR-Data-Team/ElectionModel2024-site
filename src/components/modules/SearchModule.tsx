import React, { useState, ChangeEvent, useEffect } from "react";
import Module from "../Module";
import styles from "./SearchModule.module.css";
import { RaceType } from "@/types/RaceType";
import {
  State,
  getGubernatorialRaceStates,
  getHouseRaceStates,
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
  const [
    isMaineOrNebraskaAndPresidential,
    setIsMaineOrNebraskaAndPresidential,
  ] = useState<boolean>(false);

  useEffect(() => {
    if (filteredStates.length === 0) return;
    if (!filteredStates.includes(props.state)) {
      props.setState(filteredStates[0]);
    }
  }, [filteredStates]);

  useEffect(() => {
    switch (props.raceType) {
      case RaceType.Senate:
        setFilteredStates(getSenateRaceStates());
        break;
      case RaceType.Gubernatorial:
        setFilteredStates(getGubernatorialRaceStates());
        break;
      case RaceType.House:
        setFilteredStates(getHouseRaceStates());
        if (props.district === 0) { // Added this condition
          props.setDistrict(1); // Set district to 1 if switching to House races and district is 0
        }
      default:
        setFilteredStates(Object.values(State));
        break;
    }
  }, [props.raceType]);

  // If the user changes the state to "the nation" while viewing gubernatorial predictions, switch to presidential predictions
  useEffect(() => {
    if (
      props.state === State.National &&
      props.raceType === RaceType.Gubernatorial
    ) {
      props.setState(State.Delaware);
    }
    if (
      props.raceType === RaceType.Presidential &&
      (props.state === State.Maine || props.state === State.Nebraska)
    ) {
      setIsMaineOrNebraskaAndPresidential(true);
    } else {
      setIsMaineOrNebraskaAndPresidential(false);
    }
  }, [props.state, props.raceType]);

  useEffect(() => {
    setMaxDistricts(getNumDistricts(props.state));
  }, [props.state]);

  useEffect(() => {
    if (
      props.district > maxDistricts || // If the district number is greater than the max number of districts
      (props.district === 0 && // Or if the district number is 0 and...
        !(isMaineOrNebraskaAndPresidential || props.state === State.National)) // ...the state is not the nation or Maine/Nebraska for presidential races
    ) {
      if (isMaineOrNebraskaAndPresidential) {
        props.setDistrict(0);
      } else if (
        props.raceType === RaceType.House &&
        !(props.state === State.National)
      ) {
        props.setDistrict(maxDistricts);
      }
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

  const showDistrictDropdown = (): boolean => {
    if (
      props.raceType === RaceType.House &&
      props.state !== State.National &&
      maxDistricts > 1
    )
      return true;
    if (
      props.raceType === RaceType.Presidential &&
      (props.state === State.Maine || props.state === State.Nebraska)
    )
      // Maine and Nebraska award electoral votes by congressional district and statewide
      return true;
    return false;
  };

  const getDistrictDropdownOptions = (): JSX.Element[] => {
    if (props.raceType === RaceType.Presidential) {
      // Maine and Nebraska award electoral votes by congressional district and statewide
      if (props.state === State.Maine) {
        return [
          <option key={0} value={0}>
            statewide
          </option>,
          <option key={1} value={1}>
            District 1
          </option>,
          <option key={2} value={2}>
            District 2
          </option>,
        ];
      }
      if (props.state === State.Nebraska) {
        return [
          <option key={0} value={0}>
            statewide
          </option>,
          <option key={1} value={1}>
            District 1
          </option>,
          <option key={2} value={2}>
            District 2
          </option>,
          <option key={3} value={3}>
            District 3
          </option>,
        ];
      }
    }
    if (maxDistricts === 1) {
      return [
        <option key={1} value={1}>
          at-large district
        </option>,
      ];
    }
    return Array.from({ length: maxDistricts }, (_, i) => i + 1).map(
      (district) => (
        <option key={district} value={district}>
          {`District ${district}`}
        </option>
      )
    );
  };

  return (
    <Module>
      <div className={styles.search}>
        <p>
          I want to see
          <select value={props.raceType} onChange={handleRaceChange} aria-label="Race Selection">
            {Object.values(RaceType).map((race, index) => (
              <option key={index} value={race}>
                {race}
              </option>
            ))}
          </select>
          races in
          <select
            value={props.state}
            onChange={handleStateChange}
            className={styles.drops}
            aria-label="Locale Selection"
          >
            {filteredStates.map((state, index) => (
              <option key={index} value={state}>
                {state === State.National ? "the nation" : state}
              </option>
            ))}
          </select>
          {showDistrictDropdown() && (
            <select
              className={styles.drops}
              value={props.district}
              onChange={handleDistrictChange}
              disabled={maxDistricts === 1}
              aria-label="District Selection"
            >
              {getDistrictDropdownOptions()}
            </select>
          )}
        </p>
      </div>
    </Module>
  );
}
