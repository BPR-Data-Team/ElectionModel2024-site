import Module from "../Module";
import styles from "./KeyRacesModule.module.css";
import Image from "next/image";
import bulletPoint from "/Users/johnhuang/Desktop/coding/ElectionModel2024-site/image-assets/ballot-sequence/ballot-anim00.png";

const races = [
  'Georgia Presidential',
  'North Dakota Senate',
  'California Gubernational',
  'Ohio Presidential',
  'Texas Senate',
  'Iowa Gubernational'
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
