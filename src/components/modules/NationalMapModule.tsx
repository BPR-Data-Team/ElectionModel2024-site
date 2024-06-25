import Module from "../Module";
import styles from "./MapModule.module.css";
import NationalMap from "@/components/dataviz/NationalMap";


export default function NationalMapModule(): JSX.Element {
    return (
        <Module className="nationalMapModule">
          <div className={styles.map}>
            <h3>Most Likely Outcome:</h3>
            <NationalMap/>
          </div>
        </Module>
      );
}