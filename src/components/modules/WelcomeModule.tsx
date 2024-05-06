import Module from "../Module";
import styles from "./WelcomeModule.module.css";

/**
 * The welcome module. This is the module that appears on the home page explaining the purpose of the site.
 * @returns {JSX.Element} The welcome module.
 */
export default function WelcomeModule(): JSX.Element {
  return (
    <Module>
      <div className={styles.welcome}>
        <h2>A note on 24cast.org&apos;s predictions:</h2>
        <p>
        The predictions below are based on our machine learning model. While our predictive accuracy is high for past elections, these predictions are based on data that is expected to change greatly before election day, so <b>these predictions will update over time</b>. Our &ldquo;outcome likelihood&rdquo; represents the probability of an outcome based on our current information&mdash;not a guarantee. Ultimately, the outcome of the 2024 election will depend on how the American people vote, so please <a href="https://turbovote.org/" className={styles.voteLink}>
          ensure your registration
          </a>.
        </p>
      </div>
    </Module>
  );
}
