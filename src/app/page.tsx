import PredictionModule from "@/components/modules/PredictionModule";
import styles from "./page.module.css";
import WelcomeModule from "@/components/modules/WelcomeModule";
import { ModuleWidth } from "@/components/Module";
import MapModule from "@/components/modules/MapModule";
import SimulationsModule from "@/components/modules/SimulationsModule";
import ExplainerModule from "@/components/modules/ExplainerModule";
import SHAPModule from "@/components/modules/SHAPModule";
import HistoricalModule from "@/components/modules/HistoricalModule";
import KeyRacesModule from "@/components/modules/KeyRacesModule";

/**
 * The home page. This is the main page of the site, and is the first page that users see when they visit the site.
 * @returns {JSX.Element} The home page.
 */
export default function Home(): JSX.Element {
  return (
    <main className={styles.main}>
      <WelcomeModule width={ModuleWidth.FULL} gridArea={"1 / 1 / 4 / 3"} />
      <PredictionModule width={ModuleWidth.HALF} gridArea={"4 / 1 / 8 / 2"} />
      <MapModule width={ModuleWidth.HALF} gridArea={"4 / 2 / 10 / 3"} />
      <SimulationsModule width={ModuleWidth.HALF} gridArea={"8 / 1 / 13 / 2"} />
      <ExplainerModule width={ModuleWidth.HALF} gridArea={"10 / 2 / 14 / 3"} />
      <SHAPModule width={ModuleWidth.HALF} gridArea={"13 / 1 / 17 / 2"} />
      <HistoricalModule width={ModuleWidth.HALF} gridArea={"14 / 2 / 19 / 3"} />
      <KeyRacesModule width={ModuleWidth.HALF} gridArea={"17 / 1 / 19 / 2"} />
    </main>
  );
}
