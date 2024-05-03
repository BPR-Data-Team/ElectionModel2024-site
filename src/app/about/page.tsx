
import styles from "./page.module.css";
import type { Metadata } from "next";
import React from 'react';
// import Card from './card';
import Person from './person';

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
  { id: "Asher", name: 'Asher Labovich, Founder', image: 'person.jpg', bio: "R is Asher's true love."},
  { id: "Ariel", name: 'Ariel Shifrin, Project Manager', image: 'person.jpg', bio: 'Ariel was the headshot photographer.'},
  { id: "Javier", name: 'Javier Niño-Sears, Data Contributor', image: 'headshots/headshot12.png',
  bio: 'Javier is probably watching multiple soccer matches simultaneously.'},
  { id: "Alex", name: "Alex Wick, Frontend Lead", image: '', bio: "Alex is getting kind of alright at playing drums."},
  { id: "Akshay", name: 'Akshay Mehta, Backend Lead', image: '', bio: ''},
  { id: "Sita", name: "Sita Pawar, Data Viz Lead", image: '', bio: ''},
  { id: "Amy", name: "Amy Qiao, Data Contributor", image: '', bio: ''},
  { id: "Chai", name: 'Chai Harsha, Data Contributor', image: '', bio: ''},
  { id: 'Devon', name: 'Devon Kear-Leng, Web Developer', image: '', bio: ''},
  { id: "Jed", name: 'Jed Morgan, Data Contributor', image: '', bio: 'Jed is concentrating in IAPA at Brown with a focus on national security'},
  { id: "John", name: 'John Huang, Web Developer', image: '', bio: ''},
  { id: "Logan", name: 'Logan Rabe, Political Specialist', image: '', bio: ''},
  { id: 'Nikhil', name: 'Nikhil Das, Data Contributor', image: '', bio: "In Nikhil's perfect world, it's all about boba, jazz and great banter!"},
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
      <div className={styles.grid}>
        {people.map((person) => (
          <Person key={person.id} name={person.name} image={person.image} bio={person.bio} />
        ))}
        </div>
    </div>
  )
};





export default AboutPage;
