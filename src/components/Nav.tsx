import styles from "./Nav.module.css";

/**
 * The nav component. This is the navigation bar at the top of the page.
 * TODO: Format for mobile. This will involve a hamburger menu.
 * @returns {JSX.Element} The nav component.
 */
export default function Nav(): JSX.Element {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Predictions</a>
        </li>
        <li>
          <a href="/methodology">Methodology</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
}
