import styles from "./Banner.module.css";

export default function Banner(): JSX.Element {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerText}>
        September 11: We significantly upgraded our poll averaging methodology, as well as fixed some code relating to House races. Read more in our <a href="/methodology#changelog">changelog.</a>.</div>
    </div>
  );
}
