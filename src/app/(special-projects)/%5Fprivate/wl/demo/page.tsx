import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Whitelabel Demo | 24cast.org',
};

const NewsSite: React.FC = () => {
  return (
    <div className={styles.newssite}>
      <header className={styles.header}>
      <h1>The Chicago Caller</h1>
      <h3 className={styles.subHeader}>Static White-label Demo</h3>
      <div className={styles.navBar}>
        <span className="material-symbols-outlined">menu</span>
        <div>
          <span className="material-symbols-outlined">partly_cloudy_day</span>
          <p className={styles.weather}>67°F</p>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>Local</li>
            <li>National</li>
            <li>Politics</li>
            <li>Opinion</li>
            <li>2024 Election</li>
          </ul>
        </nav>
        <div>
          <p className={styles.btn}>Log In</p>
          <p className={styles.btn}>Subscribe</p>
          <span className="material-symbols-outlined">search</span>
        </div>
        </div>
      </header>
      
      <main className={styles.maincontent}>
        <section className={styles.mainarticle}>
          <p className={styles.breadcrumbs}><b>2024 Election &gt; The Caller Oracle</b></p>
          <div className={styles.articleTitle}>
            <h3>The Caller Oracle</h3>
            <h4>Daily predictions for the 2024 general election</h4>
          </div>
          <script src="https://24cast.org/iframecode.js" async />
          <iframe src="/_private/wl/iframes" width="100%" height="324px" className={styles.iframe} id="castFrame"></iframe>
          
        </section>

        <aside className={styles.sidebar}>
          <h3>Popular Articles</h3>
          <ul>
            {Array(5).fill(0).map((_, i) => (
              <li key={i} className={styles.popArtItem}>
                <div className={styles.articlethumbnail}></div>
                <p><b>How 24cast.org predicts elections.</b><br/><span>Joe Smith</span></p>
              </li>
            ))}
          </ul>
        </aside>

        <footer className={styles.footer}>
          <h4>More from The Chicago Caller</h4>
          <ul className={styles.footerarticles}>
            {Array(3).fill(0).map((_, i) => (
              <li key={i}>
                <div className={styles.articlethumbnail}></div>
                <p><b>How 24cast.org predicts elections.</b><br/><span>Joe Smith</span></p>
              </li>
            ))}
          </ul>
        </footer>
      </main>
    </div>
  );
}

export default NewsSite;