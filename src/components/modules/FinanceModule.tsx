import Module from "../Module";
import FinanceHist from "@/components/dataviz/Finance";
import styles from "./FinanceModule.module.css";

interface FinanceModuleProps {
    raceType: string;
    std: number;
    margins: number[];
}

const FinanceModule: React.FC<FinanceModuleProps> = ({ raceType, std, margins }) => {
    return (
        <Module className="NationalMapModule">
          <div className={styles.finance}>
            <h3>How does raising money affect race outcomes?</h3>
            <FinanceHist raceType = {raceType} std = {std} margins={margins}/>
          </div>
        </Module>
      );
}

export default FinanceModule;