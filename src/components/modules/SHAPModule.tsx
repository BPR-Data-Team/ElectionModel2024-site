import Module, { ModuleWidth } from "../Module";

interface SHAPModuleProps {
  width: ModuleWidth;
}

export default function SHAPModule(props: SHAPModuleProps): JSX.Element {
  return (
    <Module width={props.width}>
      <div className="shap">
        <h2>SHAP</h2>
        <p>
          SHAP is a method to explain the output of any machine learning model.
          It connects game theory with local explanations, uniting several
          previous methods and representing the only possible consistent and
          locally accurate additive feature attribution method based on
          expectations.
        </p>
      </div>
    </Module>
  );
}
