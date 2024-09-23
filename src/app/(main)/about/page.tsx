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
import nikhil from "image-assets/headshots/nikhilNew.webp";
import chai from "image-assets/headshots/headshot10.webp";
import john from "image-assets/headshots/headshot11.webp";
import javier from "image-assets/headshots/headshot12.webp";
import blank from "image-assets/icon-set/num-icon256.png";
import louis from "image-assets/headshots/louis.webp";
import emily from "image-assets/headshots/emily.webp";
import stella from "image-assets/headshots/stella.webp";
import zoey from "image-assets/headshots/zoey.webp";
import tiziano from "image-assets/headshots/tiziano.webp";
import thomas from "image-assets/headshots/thomas.webp"
import jo from "image-assets/headshots/jo.webp"
import poder from "image-assets/press-logos/poder.webp"
import bizjournal from "image-assets/press-logos/bizjournal.svg"
import marketwatch from "image-assets/press-logos/marketwatch.svg"
import prnw from "image-assets/press-logos/pr-newswire.svg"
import moco from "image-assets/press-logos/moco360.webp"
import tpr from "image-assets/press-logos/tpr.webp"

export const metadata: Metadata = {
  title: 'About | 24cast.org',
};

const people = [
  { id: "Asher", name: "Asher Labovich, Founder", image: asher, year: "Brown '26", bio: "R is Asher's true love." },
  { id: "Ariel", name: "Ariel Shifrin, Head of Operations", image: blank, year: "Brown '27", bio: "Ariel was the headshot photographer." },
  { id: "Akshay", name: "Akshay Mehta, Technical Director", image: akshay, year: "Brown '26", bio: "" },
  { id: "Amy", name: "Amy Qiao, Comms Lead", image: amy, year: "Brown '26", bio: "Amy can not shut up about math." },
  { id: "Alex", name: "Alex Wick, Core Web Ops Lead", image: alex, year: "Brown '25", bio: "Alex is getting kind of alright at playing drums." },
  { id: "Logan", name: "Logan Rabe, Politics Director", image: logan, year: "Brown '26", bio: "" },
  { id: "Ahad", name: "Ahad Bashir, Developer", image: blank, year: "Brown Grad '25", bio: "Ahad loves writing music and playing the guitar." },
  { id: "Ben", name: "Ben Levy, Developer", image: blank, year: "Brown '27", bio: "You will not hear from Ben when the Yankees are playing." },
  { id: "Chai", name: "Chai Harsha, Developer", image: chai, year: "Brown '26", bio: "Don't tell Asher what Chai did to his model when he wasn't looking." },
  { id: "David", name: "David Chanin, Press Liason", image: blank, year: "Brown '27", bio: "David wishes they brought back nap time." },
  { id: "Devon", name: "Devon Kear-Leng, Developer", image: devon, year: "Brown '26", bio: "" },
  { id: "Emily", name: "Emily Hong, Developer", image: emily, year: "Brown '26.5", bio: "Emily enjoys following US politics while sitting safely at home in Canada." },
  { id: "Isabelle", name: "Isabelle Shapiro, Developer", image: blank, year: "Brown '26", bio: "Isabelle budgets her paychecks as 'savings' and 'coffee.'" },
  { id: "Javier", name: "Javier Niño-Sears, Developer", image: javier, year: "Brown '25", bio: "Javier is probably watching multiple soccer matches simultaneously." },
  { id: "Jed", name: "Jed Morgan, Data Contributor", image: jed, year: "Brown '26", bio: "" },
  { id: "Jo", name: "Jo Gasior-Kavishe, Comms", image: jo, year: "Brown '25", bio: "Jo wishes only for endless vanilla ice cream and endless cool math classes." },
  { id: "John", name: "John Huang, Developer", image: john, year: "Brown '27", bio: "In his free time, you can find John enjoying the beautiful weather." },
  { id: "Louis", name: "Louis Geer, Developer", image: louis, year: "Brown '27", bio: "" },
  { id: "Milan", name: "Milan Capoor, Developer", image: blank, year: "Brown '26", bio: "Milan is probably either making a spreadsheet or ranting about colonialism." },
  { id: "Nikhil", name: "Nikhil Das, Marketing/Events", image: nikhil, year: "Brown '27", bio: "Math, boba, and jazz—Nikhil lives to share and enjoy it all!" },
  { id: "Sita", name: "Sita Pawar, Data Viz Lead", image: sita, year: "Brown '25", bio: "" },
  { id: "Stella", name: "Stella Tsogtjargal, Developer", image: stella, year: "Brown '26", bio: "Stella is probably watching a cartoon right now." },
  { id: "Thomas", name: "Thomas Seeger, Digital Strategist", image: thomas, year: "Brown '27", bio: "Thomas spends his free time angrily tweeting at Elon Musk." },
  { id: "Tiziano", name: "Tiziano Pardo, Events Coordinator", image: tiziano, year: "Brown '28", bio: "" },
  { id: "Zoey", name: "Zoey Katzive, Developer", image: zoey, year: "Brown Grad '25", bio: "" }
];

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
          <a href="https://moco360.media/2024/08/19/blair-graduate-wants-to-change-how-election-data-is-used-creates-results-prediction-model/"><Image className={styles.prImage} src={moco} width={undefined} height={30} alt="McCo360" /></a>
          <a href="https://www.buzzsprout.com/352718/15350700"><Image className={styles.prImage} src={poder} width={undefined} height={40} alt="102.1FM Power (Poder) 1110" /></a>
          <a href="https://www.marketwatch.com/press-release/new-election-prediction-model-by-students-at-brown-university-outperforms-industry-leaders-e1fd2d38"><Image className={styles.prImage} src={marketwatch} width={undefined} height={30} alt="MarketWatch" /></a>
          <a href="https://www.bizjournals.com/rhodeisland/news/2024/07/05/brown-u-election-model-drive-by-ai.html"><Image className={styles.prImage} src={bizjournal} width={undefined} height={40} alt="Providence Business First" /></a>
          <a href="https://www.prnewswire.com/news-releases/new-election-prediction-model-by-students-at-brown-university-outperforms-industry-leaders-302184650.html"><Image className={styles.prImage} src={prnw} width={undefined} height={30} alt="PR Newswire" /></a>
          <a href="https://thepublicsradio.org/tgif/tgif-ian-donnis-rhode-island-politics-roundup-for-aug-2-2024/"><Image className={styles.prImage} src={tpr} width={undefined} height={25} alt="The People's Radio" /></a>
        </div>
      </div>
      <h2 className={styles.header}>24cast.org Primary Team</h2>
      <p className={styles.main}>
          Founded by Asher Labovich, 24cast.org is the product of months of effort
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
      {/* <div className={styles.main}>
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
      </div> */}
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
