import styles from "./Banner.module.css";

export default function Banner(): JSX.Element {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerText}>
        While our model is behaving as expected, this is a beta release of our
        website and we are still working out some bugs. <br /> If you notice any
        issues, please{" "}
        <a href="mailto:24castbpr@gmail.com?subject=Bug%20Report&body=Page%20affected%20by%20issue%20(Predictions%20page%2C%20About%20page%2C%20etc)%3A%0D%0A%0D%0ADescribe%20what%20the%20issue%20is%3A%0D%0A%0D%0AWhat%20device%2C%20OS%2C%20and%20browser%20were%20you%20using%20(eg%3A%20iPhone%2014%2C%20iOS%2C%20Safari)%3A%0D%0A">send us an email</a>.
      </div>
    </div>
  );
}
