import Module from "../Module";
import styles from "./MapModule.module.css";
import NationalMap, {StateData} from "@/components/dataviz/NationalMap";

const stateData1 = [
    { code: 'us-al', value: -1 }, // Alabama
    { code: 'us-ak', value: -1 }, // Alaska
    { code: 'us-az', value: -1 }, // Arizona
    { code: 'us-ar', value: -1 }, // Arkansas
    { code: 'us-ca', value: 1 },  // California
    { code: 'us-co', value: 1 },  // Colorado
    { code: 'us-ct', value: 1 },  // Connecticut
    { code: 'us-de', value: 1 },  // Delaware
    { code: 'us-fl', value: -1 }, // Florida
    { code: 'us-ga', value: -1 }, // Georgia
    { code: 'us-hi', value: 1 },  // Hawaii
    { code: 'us-id', value: -1 }, // Idaho
    { code: 'us-il', value: 1 },  // Illinois
    { code: 'us-in', value: -1 }, // Indiana
    { code: 'us-ia', value: -1 }, // Iowa
    { code: 'us-ks', value: -1 }, // Kansas
    { code: 'us-ky', value: -1 }, // Kentucky
    { code: 'us-la', value: -1 }, // Louisiana
    { code: 'us-me', value: 1 },  // Maine
    { code: 'us-md', value: 1 },  // Maryland
    { code: 'us-ma', value: 1 },  // Massachusetts
    { code: 'us-mi', value: -1 }, // Michigan
    { code: 'us-mn', value: 1 },  // Minnesota
    { code: 'us-ms', value: -1 }, // Mississippi
    { code: 'us-mo', value: -1 }, // Missouri
    { code: 'us-mt', value: -1 }, // Montana
    { code: 'us-ne', value: -1 }, // Nebraska
    { code: 'us-nv', value: -1 }, // Nevada
    { code: 'us-nh', value: 1 },  // New Hampshire
    { code: 'us-nj', value: 1 },  // New Jersey
    { code: 'us-nm', value: 1 },  // New Mexico
    { code: 'us-ny', value: 1 },  // New York
    { code: 'us-nc', value: -1 }, // North Carolina
    { code: 'us-nd', value: -1 }, // North Dakota
    { code: 'us-oh', value: -1 }, // Ohio
    { code: 'us-ok', value: -1 }, // Oklahoma
    { code: 'us-or', value: 1 },  // Oregon
    { code: 'us-pa', value: -1 }, // Pennsylvania
    { code: 'us-ri', value: 1 },  // Rhode Island
    { code: 'us-sc', value: -1 }, // South Carolina
    { code: 'us-sd', value: -1 }, // South Dakota
    { code: 'us-tn', value: -1 }, // Tennessee
    { code: 'us-tx', value: -1 }, // Texas
    { code: 'us-ut', value: -1 }, // Utah
    { code: 'us-vt', value: 1 },  // Vermont
    { code: 'us-va', value: 1 },  // Virginia
    { code: 'us-wa', value: 1 },  // Washington
    { code: 'us-wv', value: -1 }, // West Virginia
    { code: 'us-wi', value: -1 }, // Wisconsin
    { code: 'us-wy', value: -1 }  // Wyoming
];

const stateData2 = [
    { code: 'us-al', value: -1 }, // Alabama
    { code: 'us-ak', value: -1 }, // Alaska
    { code: 'us-az', value: 1 },  // Arizona
    { code: 'us-ar', value: -1 }, // Arkansas
    { code: 'us-ca', value: 1 },  // California
    { code: 'us-co', value: 1 },  // Colorado
    { code: 'us-ct', value: 1 },  // Connecticut
    { code: 'us-de', value: 1 },  // Delaware
    { code: 'us-fl', value: -1 }, // Florida
    { code: 'us-ga', value: -1 }, // Georgia
    { code: 'us-hi', value: 1 },  // Hawaii
    { code: 'us-id', value: -1 }, // Idaho
    { code: 'us-il', value: 1 },  // Illinois
    { code: 'us-in', value: -1 }, // Indiana
    { code: 'us-ia', value: -1 }, // Iowa
    { code: 'us-ks', value: -1 }, // Kansas
    { code: 'us-ky', value: -1 }, // Kentucky
    { code: 'us-la', value: -1 }, // Louisiana
    { code: 'us-me', value: 1 },  // Maine General
    { code: 'us-md', value: 1 },  // Maryland
    { code: 'us-ma', value: 1 },  // Massachusetts
    { code: 'us-mi', value: 1 },  // Michigan
    { code: 'us-mn', value: 1 },  // Minnesota
    { code: 'us-ms', value: -1 }, // Mississippi
    { code: 'us-mo', value: -1 }, // Missouri
    { code: 'us-mt', value: -1 }, // Montana
    { code: 'us-ne', value: -1 }, // Nebraska General
    { code: 'us-nv', value: 1 },  // Nevada
    { code: 'us-nh', value: 1 },  // New Hampshire
    { code: 'us-nj', value: 1 },  // New Jersey
    { code: 'us-nm', value: 1 },  // New Mexico
    { code: 'us-ny', value: 1 },  // New York
    { code: 'us-nc', value: -1 }, // North Carolina
    { code: 'us-nd', value: -1 }, // North Dakota
    { code: 'us-oh', value: -1 }, // Ohio
    { code: 'us-ok', value: -1 }, // Oklahoma
    { code: 'us-or', value: 1 },  // Oregon
    { code: 'us-pa', value: 1 },  // Pennsylvania
    { code: 'us-ri', value: 1 },  // Rhode Island
    { code: 'us-sc', value: -1 }, // South Carolina
    { code: 'us-sd', value: -1 }, // South Dakota
    { code: 'us-tn', value: -1 }, // Tennessee
    { code: 'us-tx', value: -1 }, // Texas
    { code: 'us-ut', value: -1 }, // Utah
    { code: 'us-vt', value: 1 },  // Vermont
    { code: 'us-va', value: 1 },  // Virginia
    { code: 'us-wa', value: 1 },  // Washington
    { code: 'us-wv', value: -1 }, // West Virginia
    { code: 'us-wi', value: 1 },  // Wisconsin
    { code: 'us-wy', value: -1 }, // Wyoming
    { code: 'us-dc', value: 1 }  // District of Columbia
];
interface NationalMapModuleProps {
    rank: number;
    probability: number;
    winner: string;
    winnerEV: number;
}
const NationalMapModule: React.FC<NationalMapModuleProps> = ({ rank, probability, winner, winnerEV }) => {
    return (
        <Module className="nationalMapModule">
          <div className={styles.map}>
            <h3>#{rank} Most Likely Outcome:</h3>
            <p>In {probability}% of races, {winner} wins {winnerEV}-{538 - winnerEV}.</p>
            <NationalMap stateData={rank === 1 ? stateData1 : stateData2} rank={rank}/>
          </div>
        </Module>
      );
}

export default NationalMapModule;