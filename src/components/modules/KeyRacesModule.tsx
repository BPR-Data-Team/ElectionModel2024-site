import Module from "../Module";
import styles from "./KeyRacesModule.module.css";
import Image from "next/image";
import bulletPoint from "image-assets/ballot-sequence/ballot-anim00.png";
import { RaceType } from "@/types/RaceType";
import {
  State
} from "@/types/State";
import { useEffect, useState } from "react";

export const races = [
  'Washington District 3',
  'North Carolina Gubernatorial',
  'New Hampshire Gubernatorial',
  'Ohio Senate',
  'Montana Senate'
  // Add more key races as needed
];

interface KeyRacesModuleProps {
  setRaceType: (s_race: RaceType) => void;
  setState: (state: State) => void;
  setDistrict: (district: number) => void;
}

export default function KeyRacesModule(props: KeyRacesModuleProps): JSX.Element {

  function handleClick(race: string){
    if (race === races[0]){
      props.setRaceType(RaceType.House);
      props.setState(State.Washington);
      props.setDistrict(3);
    }
    if (race === races[1]) {
      props.setRaceType(RaceType.Gubernatorial);
      props.setState(State.NorthCarolina);
      props.setDistrict(0);
    }
    if (race === races[2]) {
      props.setRaceType(RaceType.Gubernatorial);
      props.setState(State.NewHampshire);
      props.setDistrict(0);
    }
    if (race === races[3]) {
      props.setRaceType(RaceType.Senate);
      props.setState(State.Ohio);
      props.setDistrict(0);
    }
    if (race === races[4]) {
      props.setRaceType(RaceType.Senate);
      props.setState(State.Montana);
      props.setDistrict(0);
    }
  }

  return (
    <Module>
      <div className={styles.keyRaces}>
        <h3 className={styles.exploreText}>Explore Key Races</h3>
        <div className={styles.grid}>
          {races.map((race, index) => (
            <div key={index} className={styles.race} onClick={() => handleClick(race)}>
              <Image
                src={bulletPoint}
                width={15}
                alt="bullet point"
              />
              <a href="javascript:;" className={styles.linkText}>{race}</a>
            </div>
          ))}
        </div>
      </div>
    </Module>
  );

}
