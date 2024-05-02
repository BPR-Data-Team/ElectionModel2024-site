import styles from "./Footer.module.css";

export default function Footer(): JSX.Element {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <div>
          <a className={styles.footerText}>© 2024 Brown Political Review</a>
        </div>
        <div>
          <span className={styles.footerText}>
            A CC BY-SA 4.0 license applies to this website, and an MIT license
            applies to this website and some of its underlying data. See more
            information at our
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
          <a className={styles.linkText} href="/tos">
            Terms of Use
          </a>
          <span className={styles.betweenText}> | </span>
          <a className={styles.linkText} href="/privacy">
            Privacy Policy
          </a>
          <span className={styles.betweenText}> | </span>
          <a className={styles.linkText} href="/map">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
}
