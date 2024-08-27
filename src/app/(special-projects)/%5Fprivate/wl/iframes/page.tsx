"use client";

import styles from "./page.module.css";
import { Metadata } from "next";
import { BioRhyme, Radio_Canada } from 'next/font/google'
import Image from "next/image";
import Illinois from "image-assets/wl-content/illinois.svg"
import DonutChart from "src/components/dataviz/SHAPDonut";
import { Histogram } from "src/components/dataviz/Histogram";
import { SHAPFactor } from "@/types/SHAPFactor";
import { Party } from "@/types/Party";
import { RaceType } from "@/types/RaceType";
import { State } from "@/types/State";

const SHAPValues = {
  [SHAPFactor.ExpertRatings]: 1.5,
  [SHAPFactor.VotingRegulations]: 0.5,
  [SHAPFactor.ConsumerConfidenceIndex]: 0.1,
  [SHAPFactor.Other]: 0.9,
  [SHAPFactor.CampaignFinance]: -1.2,
  [SHAPFactor.UnemploymentAndInflation]: -0.7,
  [SHAPFactor.Demographics]: 0.01,
  [SHAPFactor.CompositionOfCongressAndPresidency]: 0.1,
  [SHAPFactor.GasPrices]: 0.2,
  [SHAPFactor.PastElections]: 3.1,
  [SHAPFactor.Polls]: -1.2,
}

const HistogramData = {
  binBounds: [-100, 100] as [number, number],
  binEdges: [-100.0, -96.0, -92.0, -88.0, -84.0, -80.0, -76.0, -72.0, -68.0, -64.0, -60.0, -56.0, -52.0, -48.0, -44.0, -40.0, -36.0, -32.0, -28.0, -24.0, -20.0, -16.0, -12.0, -8.0, -4.0, 0.0, 4.0, 8.0, 12.0, 16.0, 20.0, 24.0, 28.0, 32.0, 36.0, 40.0, 44.0, 48.0, 52.0, 56.0, 60.0, 64.0, 68.0, 72.0, 76.0, 80.0, 84.0, 88.0, 92.0, 96.0, 100.0],
  bins: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 36, 218, 871, 2919, 7358, 13759, 19687, 21318, 17065, 10111, 4576, 1588, 412, 69, 8, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  raceType: RaceType.Presidential,
  state: State.Illinois,
  winner: Party.Democrat,
}

const biorhyme = BioRhyme({ subsets: ['latin'] })

const radioCanada = Radio_Canada({
  weight: '400', // Ensure this weight is available
  style: 'normal', // Ensure this style is available
  subsets: ['latin']
});

const NewsSite: React.FC = () => {
  return (
    <div className={styles.frame} style={{ fontFamily: radioCanada.style.fontFamily }}>
      <div className={styles.wrapper}>
        <div className={styles.summaryBlock}>
          <div className={styles.geography} style={{position: 'relative'}}>
            <Image 
            src={Illinois}
            alt="Illinois Silhouette"
            fill={true}
            />
          </div>
          <div className={styles.summaryStack}>
            <div className={styles.raceNav}>
              <ul>
                <li><a href="#" className={styles.active}>Presidential</a></li>
                <li><a href="#">House</a></li>
                <li><a href="#">Senate</a></li>
                <li><a href="#">Gubernatorial</a></li>
              </ul>
            </div>
            <div className={styles.leadText}>
              <h3>Joe Biden is favored to win the presidency in Illinois.</h3>
            </div>
            <div className={styles.summaryMetrics}>
              <div className={styles.metricBlock}>
                <div className={styles.metricIcon}>
                  <span className="material-symbols-outlined">trophy</span>
                </div>
                <div className={styles.metricStack}>
                  <p>Outcome Likelihood:</p>
                  <p>78%</p>
                </div>
              </div>
              <div className={styles.metricBlock}>
                <div className={styles.metricIcon}>
                  <span className="material-symbols-outlined">data_usage</span>
                </div>
                <div className={styles.metricStack}>
                  <p>Predicted Margin:</p>
                  <p>+3.48</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.vizBlock}>
          <div className={styles.vizStack}>
            <p>We simulated the margin this race 100,000 times. <wbr /><b>Here&apos;s the distribution of the simulations:</b></p>
            <Histogram {...HistogramData} ></Histogram>
          </div>
          <div className={styles.vizStack}>
            <p>Our model is informed by data that updates daily. <wbr /><b>Here&apos;s what was most impactful on our model:</b></p>
            <DonutChart SHAPFactors={SHAPValues} />
          </div>
        </div>
        <div className={styles.footer}>
          <p className={styles.cta}><a href="https://24cast.org">See more predictions/details</a></p>
          <p className={styles.credit}><a href="https://24cast.org">Powered by <span className={styles.wordmark}>24cast.org</span></a></p>
        </div>
      </div>
    </div>
  );
}

export default NewsSite;