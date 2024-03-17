import Module, { ModuleWidth } from "../Module";

interface HistoricalModuleProps {
  width: ModuleWidth;
}

export default function HistoricalModule(
  props: HistoricalModuleProps
): JSX.Element {
  return (
    <Module width={props.width}>
      <div className="historical">
        <h2>Historical</h2>
        <p>This is the historical module. It shows historical predictions.</p>
      </div>
    </Module>
  );
}
