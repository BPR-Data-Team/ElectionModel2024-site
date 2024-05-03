import Module from "../Module";
import styles from "./KeyRacesModule.module.css";
import Image from "next/image";
import bulletPoint from "image-assets/ballot-sequence/ballot-anim00.png";

export const races = [
  'Washington District 3',
  'North Carolina Gubernatorial',
  'New Hampshire Gubernational',
  'Ohio Senate',
  'Montana Senate'
  // Add more key races as needed
];


export default function KeyRacesModule(): JSX.Element {
  return (
    <Module>
      <div className={styles.keyRaces}>
        <h3>Explore Key Races</h3>
        <div className={styles.grid}>
          {races.map((race, index) => (
            <div key={index} className={styles.race}>
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
