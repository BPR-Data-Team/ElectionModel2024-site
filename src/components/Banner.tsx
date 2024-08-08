import styles from "./Banner.module.css";

export default function Banner(): JSX.Element {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerText}>
        Due to unexpected user volume, predictions might take more time to load.
        {" "} We are actively working on a solution and appreciate your patience.
      </div>
    </div>
  );
}
