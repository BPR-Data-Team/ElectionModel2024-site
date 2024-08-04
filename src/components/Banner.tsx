import styles from "./Banner.module.css";

export default function Banner(): JSX.Element {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerText}>
        Our predictive accuracy will be lowered for the presidential
        race until polling data featuring Vice President Harris becomes substantial. 
        {" "}<a href="https://www.instagram.com/p/C9stR0NPHAR/">Read our statement.</a>
      </div>
    </div>
  );
}
