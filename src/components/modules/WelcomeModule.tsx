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
          Text coming soon.
        </p>
      </div>
    </Module>
  );
}
