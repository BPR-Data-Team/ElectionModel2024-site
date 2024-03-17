import Module, { ModuleWidth } from "../Module";

interface ExplainerModuleProps {
  width: ModuleWidth;
}

export default function ExplainerModule(
  props: ExplainerModuleProps
): JSX.Element {
  return (
    <Module width={props.width}>
      <div className="explainer">
        <h2>Explainer</h2>
        <p>This is the explainer module. It explains things.</p>
      </div>
    </Module>
  );
}
