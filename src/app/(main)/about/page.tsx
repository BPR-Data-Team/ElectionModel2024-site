import styles from "./page.module.css";
import type { Metadata } from "next";
import Image from "next/image";
import akshay from "image-assets/headshots/headshot1.webp";
import amy from "image-assets/headshots/headshot2.webp";
import sita from "image-assets/headshots/headshot3.webp";
import logan from "image-assets/headshots/headshot4.webp";
import jed from "image-assets/headshots/headshot5.webp";
import alex from "image-assets/headshots/headshot6.webp";
import asher from "image-assets/headshots/headshot7.webp";
import devon from "image-assets/headshots/headshot8.webp";
import nikhil from "image-assets/headshots/headshot9.webp";
import chai from "image-assets/headshots/headshot10.webp";
import john from "image-assets/headshots/headshot11.webp";
import javier from "image-assets/headshots/headshot12.webp";
import blank from "image-assets/icon-set/num-icon256.png";
import poder from "image-assets/press-logos/poder.webp"
import bizjournal from "image-assets/press-logos/bizjournal.svg"
import marketwatch from "image-assets/press-logos/marketwatch.svg"
import prnw from "image-assets/press-logos/pr-newswire.svg"

export const metadata: Metadata = {
  title: 'About | 24cast.org',
};

const people = [
  { id: "Asher", name: 'Asher Labovich, Founder', image: asher, year: "Brown '26", bio: "R is Asher's true love."},
  { id: "Ariel", name: 'Ariel Shifrin, Operations Manager', image: blank, year: "Brown '27", bio: 'Ariel was the headshot photographer.'},
  { id: "Alex", name: "Alex Wick, Frontend Lead", image: alex, year: "Brown '25", bio: "Alex is getting kind of alright at playing drums."},
  { id: "Akshay", name: 'Akshay Mehta, Fullstack/Backend Lead', image: akshay, year: "Brown '26", bio: ''},
  { id: "Sita", name: "Sita Pawar, Data Viz Lead", image: sita, year: "Brown '25", bio: ''},
  { id: "Amy", name: "Amy Qiao, Social Media/Data Lead", image: amy, year: "Brown '26", bio: ''},
  { id: "Javier", name: 'Javier Niño-Sears, Data Contributor', image: javier, year: "Brown '25", bio: 'Javier is probably watching multiple soccer matches simultaneously.'},
  { id: "Chai", name: 'Chai Harsha, Data Contributor', image: chai, year: "Brown '26", bio: "Don't tell Asher what Chai did to his model when he wasn't looking."},
  { id: "Jed", name: 'Jed Morgan, Data Contributor', image: jed, year: "Brown '26", bio: 'Jed is concentrating in IAPA at Brown with a focus on national security.'},
  { id: 'Nikhil', name: 'Nikhil Das, Data Contributor', image: nikhil, year: "Brown '27", bio: "In Nikhil's perfect world, it's all about boba, jazz and great banter!"},
  { id: "John", name: 'John Huang, Web Developer', image: john, year: "Brown '27", bio: ''},
  { id: 'Devon', name: 'Devon Kear-Leng, Web Developer', image: devon, year: "Brown '26", bio: ''},
  { id: "Logan", name: 'Logan Rabe, Political Specialist', image: logan, year: "Brown '26", bio: ''},
]

const allpeople = [
  { id: "Ryan", name: 'Ryan Doherty', title: 'Data Director' },
  { id: "Asher", name: 'Asher Labovich', title: 'Data Director' },
  { id: "Amy", name: 'Amy Qiao', title: 'Data Editor' },
  { id: "Logan", name: 'Logan Rabe', title: 'Data Editor' },
  { id: "Aimee", name: 'Aimee Zhang', title: 'Data Associate' },
  { id: "Alex", name: 'Alex Freehoff', title: 'Data Associate' },
  { id: "AlexW", name: 'Alex Wick', title: 'Data Associate' },
  { id: "Amanda", name: 'Amanda Sun', title: 'Data Associate' },
  { id: "Amine", name: 'Amine Chajar', title: 'Data Associate' },
  { id: "Ariel", name: 'Ariel Shifrin', title: 'Data Associate' },
  { id: "Benjamin", name: 'Benjamin Buka', title: 'Data Associate' },
  { id: "Casey", name: 'Casey Crockett', title: 'Data Associate' },
  { id: "Chai", name: 'Chai Harsha', title: 'Data Associate' },
  { id: "Gabi", name: 'Gabi Yuan', title: 'Data Associate' },
  { id: "Irene", name: 'Irene Zhao', title: 'Data Associate' },
  { id: "Jed", name: 'Jed Morgan', title: 'Data Associate' },
  { id: "Jennifer", name: 'Jennifer Shim', title: 'Data Associate' },
  { id: "Jester", name: 'Jester Abella', title: 'Data Associate' },
  { id: "Jo", name: 'Jo Gasior-Kavishe', title: 'Data Associate' },
  { id: "Nikhil", name: 'Nikhil Das', title: 'Data Associate' },
  { id: "Sita", name: 'Sita Pawar', title: 'Data Associate' },
  { id: "Sofia", name: 'Sofia Barnett', title: 'Data Associate' },
  { id: "Tiffany", name: 'Tiffany Kuo', title: 'Data Associate' },
  { id: "Titi", name: 'Titi Zhang', title: 'Data Associate' },
  { id: "William", name: 'William Yu', title: 'Data Associate' },
];


const AboutPage: React.FC = () => {
  return (
    <div className={styles.overall}>
      <div className={styles.main}>
        <h1 className={styles.header}>About 24cast.org</h1>
        <p>
          This isn&apos;t your typical election prediction model—we use new methods to determine the outcomes
          of races down to the margin and break down <i>exactly</i> how each race&apos;s history
          affects expected outcomes.
        </p>
        <p>
          24cast.org is produced by the Brown Political Review&apos;s Data Board. When the Data Board isn&apos;t innovating
          election predictions, our team writes <a className={styles.linkText} href='https://brownpoliticalreview.org/category/data/'>data-driven articles</a> for BPR
          and creates data visualizations for <a className={styles.linkText} href='https://brownpoliticalreview.org/'>articles</a> written by BPR&apos;s Editorial Board.
        </p>
        <p>
          24cast.org is the successor to an <a className={styles.linkText} href='https://brownpoliticalreview.org/2022/10/senate-midterm-forecast-model/'>election model</a> produced by BPR during the previous election cycle
          featuring a fully revised structure (learn more at our <a className={styles.linkText} href="/methodology">methodology</a> page!)
        </p>
        <p>
          <b>Please <a className={styles.linkText} href='mailto:24castbpr@gmail.com'>contact us</a> with any questions, ideas, or press inquiries.</b> Our <a className={styles.linkText} href="https://drive.google.com/drive/folders/1AM1eAzHxJSkhnvdIwNUSsZYrfRnNew45">media kit</a> is also available for the press.
        </p>
        <h2 className={styles.header}>24cast.org In The Media</h2>
        <div className={styles.prGrid}>
          <a href="https://www.buzzsprout.com/352718/15350700"><Image className={styles.prImage} src={poder} width={undefined} height={40} alt="102.1FM Power (Poder) 1110" /></a>
          <a href="https://www.marketwatch.com/press-release/new-election-prediction-model-by-students-at-brown-university-outperforms-industry-leaders-e1fd2d38"><Image className={styles.prImage} src={marketwatch} width={undefined} height={30} alt="MarketWatch" /></a>
          <a href="https://www.bizjournals.com/rhodeisland/news/2024/07/05/brown-u-election-model-drive-by-ai.html"><Image className={styles.prImage} src={bizjournal} width={undefined} height={40} alt="Providence Business First" /></a>
          <a href="https://www.prnewswire.com/news-releases/new-election-prediction-model-by-students-at-brown-university-outperforms-industry-leaders-302184650.html"><Image className={styles.prImage} src={prnw} width={undefined} height={30} alt="PR Newswire" /></a>
        </div>
      </div>
      <h2 className={styles.header}>24cast.org Primary Team</h2>
      <p className={styles.main}>
          Spearheaded by founder Asher Labovich, 24cast.org is the product of months of effort
          by a team of Brown students, who we wish to highlight below:
        </p>
      <div className={styles.grid}>
        {people.map((person) => (
          <div key={person.id} className={styles.person}>
            <div>
              <Image
                src={person.image}
                width={80}
                height={80}
                alt="person"
                className={styles.image}
              />
            </div>
            <div className={styles.info}>
              <h3 className={styles.name}>{person.name}</h3>
              <p className={styles.year}>{person.year}</p>
              <p className={styles.bio}>{person.bio}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.main}>
        <h2>
          Brown Political Review Data Board:
        </h2>
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
      </div>
      <div className={styles.main}>
        <h3>
          <br />
          <a href="https://brownpoliticalreview.org/masthead/" className={styles.linkText}>Brown Political Review Masthead</a>
        </h3>
      </div>
      <div className={styles.main}>
        <h2 className={styles.header}>
          24cast.org wishes to thank the following organizations for their data:
        </h2>
        <p>
        <i>(endorsement of 24cast.org is not implied through inclusion in this list)</i>
        </p>
        <p>
          <a href="https://www.cookpolitical.com/" className={styles.linkText}>Cook Political Report</a> &bull; <a href="https://costofvotingindex.com/" className={styles.linkText}>Cost of Voting Index</a> &bull; <a href="https://abcnews.go.com/538" className={styles.linkText}>FiveThirtyEight</a> &bull;{" "}
          <a href="https://fred.stlouisfed.org/" className={styles.linkText}>FRED</a> &bull; <a href="https://centerforpolitics.org/crystalball/" className={styles.linkText}>UVA Center for Politics</a>
        </p>
      </div>
    </div>
  )
};
export default AboutPage;