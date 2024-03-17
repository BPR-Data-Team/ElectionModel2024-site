import Module, { ModuleWidth } from "../Module";

interface MapModuleProps {
  width: ModuleWidth;
}

export default function MapModule(props: MapModuleProps): JSX.Element {
  return (
    <Module width={props.width}>
      <div className="map">Map</div>
    </Module>
  );
}
