import styles from "./Footer.module.css";
/*
import Image from "next/image";
import InstaIcon from "image-assets/instagram.svg";
import LinkedinIcon from "image-assets/linkedin.svg";
import TwitterIcon from "image-assets/twitter.svg";
import Github from "image-assets/github.svg"
*/
import { FaInstagram, FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa6";

export default function Footer(): JSX.Element {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <div>
          <a className={styles.footerText}>© 2024 Brown Political Review</a>
        </div>
        <div>
          <span className={styles.footerText}>25 George Street, Providence, RI 02912</span>
        </div>
        <div>
          <span className={styles.footerText}>
            Find a bug or want to get in touch?{" "}<a
              className={styles.linkTextAlt}
              href="mailto:24castbpr@gmail.com"
            >Email us</a>.
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
            <FaInstagram className={styles.socialicon} title="Instagram" />
          </a>
          <a className={styles.linkText} href="https://twitter.com/Brown24cast">
            <FaTwitter className={styles.socialicon} title="Twitter" />
          </a>
          <a className={styles.linkText} href="https://www.linkedin.com/company/24castorg/">
            <FaLinkedinIn className={styles.socialicon} title="LinkedIn" />
          </a>
          <a className={styles.linkText} href="https://github.com/BPR-Data-Team/ElectionModel2024">
            <FaGithub className={styles.socialicon} title="Instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
}
