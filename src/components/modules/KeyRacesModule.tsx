import Module from "../Module";
import styles from "./KeyRacesModule.module.css";
import Image from "next/image";
import bulletPoint from "image-assets/ballot-sequence/ballot-anim00.png";
import { RaceType } from "@/types/RaceType";
import {
  State
} from "@/types/State";

export const races = [
  'Washington District 3',
  'North Carolina Gubernatorial',
  'New Hampshire Gubernational',
  'Ohio Senate',
  'Montana Senate'
  // Add more key races as needed
];

interface KeyRacesModuleProps {
  raceType: RaceType;
  state: State;
  district: number;
  setRaceType: (raceType: RaceType) => void;
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
      props.setRaceType(RaceType.gubernational);
      props.setState(State.NorthCarolina);
    }
    if (race === races[2]) {
      props.setRaceType(RaceType.gubernational);
      props.setState(State.NewHampshire);
    }
    if (race === races[3]) {
      props.setRaceType(RaceType.Senate);
      props.setState(State.Ohio);
    }
    if (race === races[4]) {
      props.setRaceType(RaceType.Senate);
      props.setState(State.Montana);
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
              <p>{race}</p>
            </div>
          ))}
        </div>
      </div>
    </Module>
  );

}
