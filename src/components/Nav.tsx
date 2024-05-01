"use client"
import styles from "./Nav.module.css";
import { useEffect, useState } from 'react';

/**
 * The nav component. This is the navigation bar at the top of the page.
 * TODO: Format for mobile. This will involve a hamburger menu.
 * @returns {JSX.Element} The nav component.
 */
export default function Nav(): JSX.Element {
  
  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  
  
  return (
    <nav>
      <ul>
        <li>
          <a href="/" className={currentPath === '/' ? styles.ballotItemS : styles.ballotItemU}>Predictions</a>
        </li>
        <li>
          <a href="/methodology" className={currentPath === '/methodology' ? styles.ballotItemS : styles.ballotItemU}>Methodology</a>
        </li>
        <li>
          <a href="/about" className={currentPath === '/about' ? styles.ballotItemS : styles.ballotItemU}>About</a>
        </li>
      </ul>
    </nav>
  );
}
