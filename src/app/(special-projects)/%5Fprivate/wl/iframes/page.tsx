import styles from "./page.module.css";
import { Metadata } from "next";
import { BioRhyme, Radio_Canada } from 'next/font/google'
import Image from "next/image";
import Illinois from "image-assets/wl-content/illinois.svg"

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
            layout="fill"
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
          </div>
          <div className={styles.vizStack}>
            <p>Our model is informed by data that updates daily. <wbr /><b>Here&apos;s what was most impactful on our model:</b></p>
          </div>
        </div>
        <div className={styles.footer}>
          <p className={styles.cta}><a href="https://24cast.org">See more predictions/more details</a></p>
          <p className={styles.credit}><a href="https://24cast.org">Powered by <span className={styles.wordmark}>24cast.org</span></a></p>
        </div>
      </div>
    </div>
  );
}

export default NewsSite;