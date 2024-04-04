import styles from "./DownloadThisCard.module.css";
import Download from "./svgs/Download";

export default function DownloadThisCard(): JSX.Element {
  return (
    <div className={styles.downloadThisCard}>
      <a href="#">
        Download this card <Download />
      </a>
    </div>
  );
}
