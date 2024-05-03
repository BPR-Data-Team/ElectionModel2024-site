
import styles from "./page.module.css";
import type { Metadata } from "next";
import React from 'react';
import Card from './card';

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

const People = [
  { id: "Asher", image: 'person.jpg', bio: 'bio'},
  { id: "Javier", image: 'person.jpg', bio: 'bio'},
  { id: "Ariel", image: 'person.jpg', bio: 'bio'},
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
        <b>Please contact us with any questions, ideas, or press inquiries at <a className={styles.linkText} href="mailto: asher_labovich@brown.edu">this email</a>.</b>
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
      <div className={styles.grid}>
        {People.map((person) => (
          <Card key={person.id} image={person.image} bio={person.bio} />
        ))}
      </div>
    </div>
  )
};





export default AboutPage;
