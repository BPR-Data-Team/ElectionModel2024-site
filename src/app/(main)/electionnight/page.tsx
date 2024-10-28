import styles from "./page.module.css";
import type { Metadata } from "next";
import Image from "next/image";
import bpu from "image-assets/key-cosponsors/bpu.svg";
import bv from "image-assets/key-cosponsors/bv.png";
import wattaub from "image-assets/key-cosponsors/wat-taub.png";
import lib from "image-assets/key-cosponsors/lib.svg";


export const metadata: Metadata = {
  title: 'Election Night | 24cast.org',
};

const firstpeople = [
  { id: "Asher", name: 'Asher Labovich', title: 'Host' },
  { id: "Ariel", name: 'Ariel Shifrin', title: 'Director' },
  { id: "LoganR", name: 'Logan Rabe', title: 'Decision Desk Lead' },
  { id: "Milan", name: 'Milan Capoor', title: 'Event Producer' },
  { id: "Sita", name: 'Sita Pawar', title: 'Event Producer' },
];

const allpeople = [
  { id: "Caleb", name: 'Caleb Ellenberg', title: 'Decision Desk' },
  { id: "Charlotte", name: 'Charlotte Callender', title: 'Decision Desk' },
  { id: "Chris", name: 'Chris	Pollack', title: 'Student Panel' },
  { id: "Daniel", name: 'Daniel	Shin', title: 'Event Staff' },
  { id: "Garret", name: 'Garrett Brand', title: 'Student Panel' },
  { id: "Jordan", name: 'Jordan	Lac', title: 'Student Panel' },
  { id: "Junkai", name: 'Junkai	Gong', title: 'Decision Desk' },
  { id: "Lily", name: 'Lily	Zamora', title: 'Student Panel' },
  { id: "LoganT", name: 'Logan Tullai', title: 'Presenter' },
  { id: "Manav", name: 'Manav	Musunuru', title: 'Decision Desk' },
  { id: "Mia", name: 'Mia	Tretta', title: 'Student Panel' },
  { id: "Rosie", name: 'Rosie	Shultz', title: 'Student Panel' },
  { id: "Shannon", name: 'Shannon Feerick-Hillenbrand', title: 'Student Panel' },
  { id: "Thomas", name: 'Thomas Seeger', title: 'Decision Desk' },
  { id: "Tiziano", name: 'Tiziano	Pardo', title: 'Decision Desk' },
  { id: "Will", name: 'Will	Loughridge', title: 'Student Panel' },
];


const AboutPage: React.FC = () => {
  return (
    <div className={styles.overall}>
      <div className={styles.main}>
        <h1 className={styles.header}>24cast.org's Election Night Event</h1>
        <h3>Salomon Center, Providence, RI | 7:00 PM - 12:00 AM</h3>
        <p>
          Join us in person or on our live broadcast for special guests, student & faculty commentary, political analysis using our custom Election Portal, and live race calls!
        </p>
      </div>
      <div className={styles.main}>
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/Gse1LKXuV2M?si=sdadUPxrehYwphH3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>

      <div className={styles.main}>
        <h2>
          Key Co-Sponsors:
        </h2>
        <div className={styles.prGrid}>
            <a href="https://www.brownpoliticalunion.org/"><Image className={styles.prImage} src={bpu} width={undefined} height={45} alt="Brown Political Union" /></a>
            <a href="https://home.watson.brown.edu"><Image className={styles.prImage} src={wattaub} width={undefined} height={35} alt="Watson Institute and Taubman Center" /></a>
            <a href="https://brownvotes.brown.edu"><Image className={styles.prImage} src={bv} width={undefined} height={30} alt="Brown Votes" /></a>
            <a href="https://library.brown.edu"><Image className={styles.prImage} src={lib} width={undefined} height={40} alt="Brown University Libraries" /></a>
          </div>
      </div>

      <div className={styles.main}>
        <h2>
          Election Night Staff:
        </h2>
        <div className={styles.minigrid}>
        {firstpeople.map((person) => (
          <div key={person.id} className={styles.miniperson}>
            <div className={styles.miniinfo}>
              <h3 className={styles.name}>{person.name}</h3>
              <p className={styles.bio}>{person.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.minigrid}>
        {allpeople.map((person) => (
          <div key={person.id} className={styles.miniperson}>
            <div className={styles.miniinfo}>
              <h3 className={styles.name}>{person.name}</h3>
              <p className={styles.bio}>{person.title}</p>
            </div>
          </div>
        ))}
      </div>
      <p>
        <i>We also wish to thank Brown Media Services for their support. <br /> This event would not be possible without the hard work of our <a href="/about" className={styles.linkText}>24cast.org team</a>.</i>
        </p>
      </div>
    </div>
  )
};
export default AboutPage;
