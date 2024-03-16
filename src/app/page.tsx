import PredictionModule from "@/components/modules/PredictionModule";
import styles from "./page.module.css";
import WelcomeModule from "@/components/modules/WelcomeModule";
import { ModuleWidth } from "@/components/Module";
import MapModule from "@/components/modules/MapModule";

/**
 * The home page. This is the main page of the site, and is the first page that users see when they visit the site.
 * @returns {JSX.Element} The home page.
 */
export default function Home(): JSX.Element {
  return (
    <main className={styles.main}>
      <WelcomeModule width={ModuleWidth.FULL} />
      <PredictionModule width={ModuleWidth.HALF} />
      <MapModule width={ModuleWidth.HALF} />
    </main>
  );
}
