import styles from "./Footer.module.css";

export default function Footer(): JSX.Element {
    return (
      <header>
        <div>
          <a className={styles.footerText}>© 2024 Brown Political Review</a>
        </div>
        <div>
          <span className={styles.footerText}>
            An MIT License Applies to this website, its underlying prediction
            model, and some of its underlying data. See more information at our
            <span> </span>
            <a
              className={styles.linkText}
              href="https://github.com/BPR-Data-Team/ElectionModel2024"
            >
              Github
            </a>
          </span>
          {/** TODO: Make sure this Github link is correct. */}
        </div>
        <div>
          {/** TODO: Link to Terms of Use, Privacy Policy, and Sitemap when they are finished. */}
          <a className={styles.linkText} href="">Terms of Use</a>
          <span className={styles.betweenText}> | </span>
          <a className={styles.linkText} href="">Privacy Policy</a>
          <span className={styles.betweenText}> | </span>
          <a className={styles.linkText} href="">Sitemap</a>
        </div>
      </header>
    );
}