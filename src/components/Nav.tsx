"use client"
import {useState } from 'react';
import Link from 'next/link';
import styles from "./Nav.module.css";
import { usePathname } from 'next/navigation';
import menu from 'image-assets/menu.svg';
import closemenu from 'image-assets/menu_open.svg'
import Image from 'next/image';

export default function Nav() {

  const currentPath = usePathname();

  const [displayMenu, setDisplayMenu] = useState<boolean>(false);

  return (
    <nav>
      <div className={styles.navContainer}>
        <div className={styles.navBar}>
          <ul>
            <li>
              <Link href="/" className={currentPath === '/' ? styles.ballotItemS : styles.ballotItemU}>Predictions</Link>
            </li>
            <li>
              <Link href="/soon" className={currentPath === '/methodology' ? styles.ballotItemS : styles.ballotItemU}>Methodology</Link>
            </li>
            <li>
              <Link href="/soon" className={currentPath === '/about' ? styles.ballotItemS : styles.ballotItemU}>About</Link>
            </li>
          </ul>
        </div>
        <div className={displayMenu ? styles.openButton : styles.huh}>
          <button
            aria-label="Open Menu"
            className={styles.hamburgerButton}
            onClick={() => setDisplayMenu(!displayMenu)}
          >
            <Image src={menu} alt='hamburger menu'/>
          </button>
        </div>
      </div>

      <div className={displayMenu ? styles.mobileMenu : styles.hideMenu}>
        <div className={styles.closeMenu}>
          <button className={styles.closeButton}
          onClick={() => setDisplayMenu(!displayMenu)}>
            <Image src={closemenu} alt='close button'/>
          </button>
        </div>
        <div className={styles.logo}>
          <h1>
            <a href="/">
              <span className="red">2</span>
              <span className="blue">4</span>cast.org
            </a>
          </h1>
        </div>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <div className={styles.page}>
          <h2>Pages:</h2>
        </div>
        <div className={styles.mobileLinks}>
          <Link href="/" passHref onClick={() => setDisplayMenu(!displayMenu)}
          className={currentPath === '/' ? styles.ballotItemS : styles.ballotItemU}>
            Predictions
          </Link>
          <Link href="/soon" passHref onClick={() => setDisplayMenu(!displayMenu)}
          className={currentPath === '/methodology' ? styles.ballotItemS : styles.ballotItemU}>
            Methodology
          </Link>
          <Link href="/soon" passHref onClick={() => setDisplayMenu(!displayMenu)}
          className={currentPath === '/about' ? styles.ballotItemS : styles.ballotItemU}>
            About
          </Link>
        </div>
        </div>
      </div>
    </nav>
    
  );
}


