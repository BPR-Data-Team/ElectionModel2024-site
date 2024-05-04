import styles from "./page.module.css";
import type { Metadata } from "next";
import Person from './person';
import Image from "next/image";
import akshay from "image-assets/headshots/headshot1.jpg";
import amy from "image-assets/headshots/headshot2.png";
import sita from "image-assets/headshots/headshot3.jpg";
import logan from "image-assets/headshots/headshot4.png";
import jed from "image-assets/headshots/headshot5.jpg";
import alex from "image-assets/headshots/headshot6.png";
import asher from "image-assets/headshots/headshot7.png";
import devon from "image-assets/headshots/headshot8.png";
import nikhil from "image-assets/headshots/headshot9.png";
import chai from "image-assets/headshots/headshot10.png";
import john from "image-assets/headshots/headshot11.png";
import javier from "image-assets/headshots/headshot12.png";
import blank from "image-assets/icon-set/num-icon256.png";



export function About(): JSX.Element {
  return <main className={styles.main}>About</main>;
}

export const metadata: Metadata = {
  title: 'About | 24cast.org',
};

// class Grid extends React.Component {
//   render() {
//     const layout = [
//       { i: "Javier", x: 0, y: 0, w: 1, h: 2, static: true},
//       { i: "Asher", x: 1, y: 0, w: 3, h: 2, static: true},
//       { i: "Ariel", x: 4, y: 0, w: 1, h: 2, static: true}
//     ];
//     return(
//       <GridLayout
//         className="Layout"
//         layout={layout}
//         cols={12}
//         rowHeight={30}
//         width={1200}
//       >
//         <div key="a">a</div>
//         <div key="b">b</div>
//         <div key="c">c</div>
//       </GridLayout>
//     );
//   };
// }

const people = [
  { id: "Asher", name: 'Asher Labovich, Founder', image: asher, year: "Brown '26", bio: "R is Asher's true love."},
  { id: "Ariel", name: 'Ariel Shifrin, Project Manager', image: blank, year: "Brown '27", bio: 'Ariel was the headshot photographer.'},
  { id: "Alex", name: "Alex Wick, Frontend Lead", image: alex, year: "Brown '25", bio: "Alex is getting kind of alright at playing drums."},
  { id: "Akshay", name: 'Akshay Mehta, Backend Lead', image: akshay, year: "Brown '26", bio: ''},
  { id: "Sita", name: "Sita Pawar, Data Viz Lead", image: sita, year: "Brown '25", bio: ''},
  { id: "Amy", name: "Amy Qiao, Data Contributor", image: amy, year: "Brown '26", bio: ''},
  { id: "Javier", name: 'Javier Niño-Sears, Data Contributor', image: javier, year: "Brown '25",
  bio: 'Javier is probably watching multiple soccer matches simultaneously.'},
  { id: "Chai", name: 'Chai Harsha, Data Contributor', image: chai, year: "Brown '26", bio: ''},
  { id: "Jed", name: 'Jed Morgan, Data Contributor', image: jed, year: "Brown '27", bio: 'Jed is concentrating in IAPA at Brown with a focus on national security.'},
  { id: 'Nikhil', name: 'Nikhil Das, Data Contributor', image: nikhil, year: "Brown '27", bio: "In Nikhil's perfect world, it's all about boba, jazz and great banter!"},
  { id: "John", name: 'John Huang, Web Developer', image: john, year: "Brown '27", bio: ''},
  { id: 'Devon', name: 'Devon Kear-Leng, Web Developer', image: devon, year: "Brown '26", bio: ''},
  { id: "Logan", name: 'Logan Rabe, Political Specialist', image: logan, year: "Brown '26", bio: ''},
]

const AboutPage: React.FC = () => {
  return (
    <div className={styles.center}>
      <h1>About 24cast</h1>
      <p>
        <b>This isn't your typical election prediction</b>—we use new methods to determine the outcomes
          of races down to the margin and break down <i>exactly</i> how each race's history
          affects expected outcomes.
      </p>
      <p>
        24cast is produced by the Brown Political Review's Data Board. When the Data Board isn't innovating
        election predictions, our team writes <a className={styles.linkText} href='https://brownpoliticalreview.org/category/data/'>data-driven articles</a> for BPR
        and creates data visualizations for <a className={styles.linkText} href='https://brownpoliticalreview.org/'>articles</a> written by BPR's Editorial Board.
      </p>
      <p>
        24cast is the successor to an <a className={styles.linkText} href='https://brownpoliticalreview.org/2022/10/senate-midterm-forecast-model/'>election model</a> produced by BPR during the previous election cycle
        featuring a fully revised structure (learn more at our <a className={styles.linkText} href="/">methodology</a> page!)
      </p>
      <p>
        <b>Please contact us with any questions, ideas, or press inquiries at <u>24castbpr@gmail.com</u>.</b>
      </p>
      {/* consider adding email address straight in here instead of linking it */}
      <p>
        Spearheaded by founder Asher Labovich, 24cast is the product of months of effort
        by a team of Brown students, who we wish to highlight below:
      </p>
      <br></br>
      <br></br>
      <h1><b>Our Team</b></h1>
      <br></br>
      {/* <div className={styles.grid}>
        {People.map((person) => (
          <Card key={person.id} image={person.image} bio={person.bio} name={person.name}/>
        ))}
      </div> */}
      {/* <div className={styles.grid}>
        {people.map((person) => (
          <Person key={person.id} {...person} />
        ))}
        </div> */}

      <div className={styles.grid}>
        {people.map((person) => (
          <div key={person.name} className={styles.person}>
            <div className={styles.image}>
              <Image
                src={person.image}
                width={100}
                height={100}
                // border-radius="50%"
                alt="person"
              />
            </div>
          <h3 className={styles.name}>{person.name}</h3>
          <p className={styles.bio}> {person.year}</p>
          <p className={styles.bio}> {person.bio}</p>
          </div>
        ))}
      </div>
    </div>
  )
};





export default AboutPage;
