import Module from "../Module";

export default function WelcomeModule(): JSX.Element {
  return (
    <Module
      content={
        <div className="welcome">
          <h2>Welcome to 24cast</h2>
          <p>
            This isn't your typical election prediction—we use an all-new method
            to determine the outcomes of races down to the margin and break down
            exactly how our model made those conclusions. Produced by the Ivy
            League's largest political journal, this model takes data across
            multiple decades and works to explain how each race's history
            affects expected outcomes.
          </p>
        </div>
      }
    />
  );
}
