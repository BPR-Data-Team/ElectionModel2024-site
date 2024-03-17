import Module, { ModuleWidth } from "../Module";

interface SimulationsModuleProps {
  width: ModuleWidth;
}

export default function SimulationsModule(
  props: SimulationsModuleProps
): JSX.Element {
  return (
    <Module width={props.width}>
      <div className="simulations">
        <h2>Simulations</h2>
        <p>
          We simulate the election 10,000 times to determine the probability of
          each party winning the election.
        </p>
      </div>
    </Module>
  );
}
