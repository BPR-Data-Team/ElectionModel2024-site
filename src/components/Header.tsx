import styles from "./Header.module.css";
import Image from "next/image";
import Logo from "image-assets/bpr-long-logo.png";
import Nav from "./Nav";

/**
 * The header component. This is the header at the top of every page. It contains the site title and the navigation.
 * @returns {JSX.Element} The header component.
 */
export default function Header(): JSX.Element {
  return (
    <header>
      <div className="content">
        <h1>
          <a href="/">
            <span className="red">2</span>
            <span className="blue">4</span>cast
          </a>
          <div className={styles.byContainer}>
            <div className={styles.byText}>By the </div>
            <Image
              src={Logo}
              width={230}
              height={11.8}
              alt={"Brown Political Review"}
            />
          </div>
        </h1>
        <Nav />
      </div>
    </header>
  );
}
