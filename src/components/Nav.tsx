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
          <a href="#">Presidential</a>
        </li>
        <li>
          <a href="/senate">Senate</a>
        </li>
        <li>
          <a href="/house">House</a>
        </li>
        <li>
          <a href="#">Governor</a>
        </li>
        <li>
          <a href="#">Methodology</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
      </ul>
    </nav>
  );
}
