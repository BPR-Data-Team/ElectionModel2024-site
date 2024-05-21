import styles from "./Footer.module.css";
import Image from "next/image";
import InstaIcon from "image-assets/Instagram_Glyph_Black.svg";

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
              className={styles.linkTextAlt}
              href="https://github.com/BPR-Data-Team/ElectionModel2024"
            >
              Github
            </a>.
          </span>
        </div>
        <div>
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
          <span className={styles.betweenText}> | </span>
          <a className={styles.linkText} href="https://www.instagram.com/24castbrown/">
          <Image
              src={InstaIcon}
              width={undefined}
              height={13}
              alt={"Instagram"}
              priority={false}
              className={styles.instaicon}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
