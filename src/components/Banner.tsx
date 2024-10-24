import styles from "./Banner.module.css";

export default function Banner(): JSX.Element {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerText}>
        Join our election night live stream on 11/05 at 7 pm ET or see us live at Brown University&apos;s Salomon Center!
      </div>
    </div>
  );
}
