import Module, { ModuleWidth } from "../Module";

interface KeyRacesModuleProps {
  width: ModuleWidth;
}

export default function KeyRacesModule(
  props: KeyRacesModuleProps
): JSX.Element {
  return (
    <Module width={props.width}>
      <div className="key-races">Key Races</div>
    </Module>
  );
}
