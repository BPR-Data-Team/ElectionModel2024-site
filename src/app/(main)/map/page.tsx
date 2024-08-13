import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Sitemap | 24cast.org',
  };

const SitemapPage: React.FC = () => {
    return (
        <div className={styles.main}>
            <h2>Sitemap</h2>
            <ul>
                <li><a className={styles.linkText} href="/">Predictions</a></li>
                <li><a className={styles.linkText} href="/methodology">Methodology</a></li>
                <li><a className={styles.linkText} href="/about">About</a></li>
                <li><a className={styles.linkText} href="/tos">Terms of Use</a></li>
                <li><a className={styles.linkText} href="/privacy">Privacy Policy</a></li>
            </ul>
        </div>

    );
};


export default SitemapPage;