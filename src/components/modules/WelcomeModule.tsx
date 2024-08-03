import Module from "../Module";
import styles from "./WelcomeModule.module.css";

export default function WelcomeModule(): JSX.Element {
  return (
    <Module>
      <div className={styles.welcome}>
        <p>
        <b>24cast.org&apos;s predictions update daily</b> as the most recent
         data comes in. While our predictive accuracy is high for past 
        elections, the outcome of the 2024 
        election will depend on how the American people vote, so please{" "} 
        <a href="https://turbovote.org/" className={styles.voteLink}>
          ensure your registration
          </a>.
        </p>
      </div>
    </Module>
  );
}
