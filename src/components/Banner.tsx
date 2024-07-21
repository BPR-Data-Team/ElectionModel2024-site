import styles from "./Banner.module.css";

export default function Banner(): JSX.Element {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerText}>
        We are actively updating our model to reflect the evolving political
        situation. Our predictive accuracy will be lowered for the presidential
        race until polling data for Democratic challengers becomes substantial.
      </div>
    </div>
  );
}
