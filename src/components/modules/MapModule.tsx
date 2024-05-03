import Module from "../Module";
import styles from "./MapModule.module.css";
import MapChart from "@/dataviz/MapChart";

export function getTestData() {
  const testData = [
    { "hc-key": "us-al", value: 0.5 },
    { "hc-key": "us-ak", value: -0.2 },
    { "hc-key": "us-az", value: 1.2 },
    { "hc-key": "us-ar", value: -0.8 },
    { "hc-key": "us-ca", value: 2.5 },
    { "hc-key": "us-co", value: 0.7 },
    { "hc-key": "us-ct", value: 1.0 },
    { "hc-key": "us-de", value: -0.3 },
    { "hc-key": "us-fl", value: 1.8 },
    { "hc-key": "us-ga", value: 1.3 },
    { "hc-key": "us-hi", value: 0.4 },
    { "hc-key": "us-id", value: -0.5 },
    { "hc-key": "us-il", value: 0.9 },
    { "hc-key": "us-in", value: 0.6 },
    { "hc-key": "us-ia", value: -0.1 },
    { "hc-key": "us-ks", value: -0.4 },
    { "hc-key": "us-ky", value: 0.2 },
    { "hc-key": "us-la", value: 0.1 },
    { "hc-key": "us-me", value: -0.7 },
    { "hc-key": "us-md", value: 1.5 },
    { "hc-key": "us-ma", value: 1.7 },
    { "hc-key": "us-mi", value: 0.8 },
    { "hc-key": "us-mn", value: 0.3 },
    { "hc-key": "us-ms", value: -0.9 },
    { "hc-key": "us-mo", value: 0.0 },
    { "hc-key": "us-mt", value: -1.2 },
    { "hc-key": "us-ne", value: -0.6 },
    { "hc-key": "us-nv", value: 1.1 },
    { "hc-key": "us-nh", value: -0.4 },
    { "hc-key": "us-nj", value: 1.9 },
    { "hc-key": "us-nm", value: 0.6 },
    { "hc-key": "us-ny", value: 2.0 },
    { "hc-key": "us-nc", value: 1.4 },
    { "hc-key": "us-nd", value: -1.0 },
    { "hc-key": "us-oh", value: 0.7 },
    { "hc-key": "us-ok", value: -0.3 },
    { "hc-key": "us-or", value: 0.5 },
    { "hc-key": "us-pa", value: 1.1 },
    { "hc-key": "us-ri", value: 0.2 },
    { "hc-key": "us-sc", value: 0.9 },
    { "hc-key": "us-sd", value: -0.8 },
    { "hc-key": "us-tn", value: 0.3 },
    { "hc-key": "us-tx", value: 1.6 },
    { "hc-key": "us-ut", value: 0.8 },
    { "hc-key": "us-vt", value: -0.1 },
    { "hc-key": "us-va", value: 1.2 },
    { "hc-key": "us-wa", value: 1.4 },
    { "hc-key": "us-wv", value: -0.2 },
    { "hc-key": "us-wi", value: 0.4 },
    { "hc-key": "us-wy", value: -0.5 },
  ];
  return testData;
}

export default function MapModule(): JSX.Element {
  return (
    <Module className="mapModule">
      <div className={styles.map}>
        <h3>24cast.org Prediction Map:</h3>
        <p>Click on a state to see more information.</p>
        <MapChart stateData={getTestData()} />
      </div>
    </Module>
  );
}
