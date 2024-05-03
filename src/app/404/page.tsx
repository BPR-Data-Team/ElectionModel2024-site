import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | 24cast.org",
};

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.center}>
      <h1 className={styles.heading}>404</h1>
      <p>
        <b>The page you are looking for does not exist.</b>
      </p>
      <p>
        Check the URL for typos or return <a className={styles.linkText} href="/">home</a>.
      </p>
    </div>
  );
};

export default NotFoundPage;
