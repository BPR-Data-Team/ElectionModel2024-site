import Module from "../Module";
import { ModuleWidth } from "../Module";

interface PredictionModuleProps {
  width: ModuleWidth;
}

export default function PredictionModule(
  props: PredictionModuleProps
): JSX.Element {
  return (
    <Module width={props.width}>
      <div className="prediction">
        <h2>Prediction</h2>
        <p>
          Based on the data we have, we predict that the next election will be a
          landslide victory for the Whigs.
        </p>
      </div>
    </Module>
  );
}
