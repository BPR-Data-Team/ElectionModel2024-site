import styles from "./Banner.module.css";

export default function Banner(): JSX.Element {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerText}>
        August 24: Changes in our predictions today are the result of the FEC releasing campaign finance data from the month of July.</div>
    </div>
  );
}
