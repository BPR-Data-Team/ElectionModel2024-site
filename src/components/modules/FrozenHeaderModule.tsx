import Module from "../Module";
import styles from "./FrozenModule.module.css";

export default function FrozenHeader(
): JSX.Element {

  return (
      <div className={styles.container}>
          <div className={styles.filler}><span></span></div>
          <p>
            &#10052; Our election predictions below are frozen as of midnight on November 5th. &#10052;
          </p>
          <div className={styles.filler}></div>
      </div>
  );
}
