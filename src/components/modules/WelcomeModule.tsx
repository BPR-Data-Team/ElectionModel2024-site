import Module, { ModuleWidth } from "../Module";
import styles from "./WelcomeModule.module.css";

interface WelcomeModuleProps {
  width: ModuleWidth;
}

/**
 * The welcome module. This is the module that appears on the home page explaining the purpose of the site.
 * @returns {JSX.Element} The welcome module.
 */
export default function WelcomeModule(props: WelcomeModuleProps): JSX.Element {
  return (
    <Module width={props.width}>
      <div className={styles.welcome}>
        <h2>Welcome to 24cast</h2>
        <p>
          This isn&apos;t your typical election prediction—we use an all-new
          method to determine the outcomes of races down to the margin and break
          down exactly how our model made those conclusions. Produced by the Ivy
          League&apos;s largest political journal, this model takes data across
          multiple decades and works to explain how each race&apos;s history
          affects expected outcomes.
        </p>
      </div>
    </Module>
  );
}
