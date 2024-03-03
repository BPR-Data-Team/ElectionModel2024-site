export default function Header() {
  return (
    <header>
      <div className="content">
        <h1>
          <a href="/">24cast</a>
        </h1>
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
      </div>
    </header>
  );
}
