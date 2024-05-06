import styles from "./Banner.module.css";

export default function Banner(): JSX.Element {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerText}>
        While our model is behaving as expected, this is a beta release of our
        website and we are still working out some bugs. <br /> If you notice any
        issues, please let us know at{" "}
        <a href="mailto:24castbpr@gmail.com">24castbpr@gmail.com</a>.
      </div>
    </div>
  );
}
