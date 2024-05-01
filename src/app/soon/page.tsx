import styles from "./page.module.css";
import type { Metadata } from "next";
import Construction from "@/components/svgs/Construction";

export const metadata: Metadata = {
  title: "Coming Soon | 24cast",
};

const ComingSoonPage: React.FC = () => {
  return (
    <div className={styles.center}>
      <h1 className={styles.heading}><Construction /></h1>
      <h1>
        This page is coming soon.
      </h1>
      <p>
        In the meantime, check out <a href="/">our predictions</a>.
      </p>
    </div>
  );
};

export default ComingSoonPage;
