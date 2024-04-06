import PredictionModule from "@/components/modules/PredictionModule";
import styles from "./page.module.css";
import WelcomeModule from "@/components/modules/WelcomeModule";
import MapModule from "@/components/modules/MapModule";
import SimulationsModule from "@/components/modules/SimulationsModule";
import ExplainerModule from "@/components/modules/ExplainerModule";
import SHAPModule from "@/components/modules/SHAPModule";
import KeyRacesModule from "@/components/modules/KeyRacesModule";

/**
 * The home page. This is the main page of the site, and is the first page that users see when they visit the site.
 * @returns {JSX.Element} The home page.
 */
export default function Home(): JSX.Element {
  return (
    <main className={styles.main}>
      <WelcomeModule />
      <PredictionModule />
      <div className={styles.mapAndSims}>
        <MapModule />
        <SimulationsModule />
      </div>
      <ExplainerModule />
      <SHAPModule />
      <KeyRacesModule />
    </main>
  );
}
