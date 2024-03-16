import Nav from "./Nav";

export default function Header(): JSX.Element {
  return (
    <header>
      <div className="content">
        <h1>
          <a href="/">24cast</a>
        </h1>
        <Nav />
      </div>
    </header>
  );
}
