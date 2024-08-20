import styles from "./Banner.module.css";

export default function Banner(): JSX.Element {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerText}>
        Changes in 24cast.org&apos;s predictions over the last week are the result{" "} 
        of routine upgrades to our predictive model. <a href="/methodology#changelog">See more.</a> 
      </div>
    </div>
  );
}
