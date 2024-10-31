import styles from "./Banner.module.css";

export default function Banner(): JSX.Element {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerText}>
        We&apos;re building lots of new technology for election night and one of our upgrades disrupted our data feeds. Please check back soon as we work to restore service.
      </div>
    </div>
  );
}
