/**
 * Interface for the Module component props.
 * This is the format of the data that the Module component expects to receive.
 * @property {JSX.Element} content - The content to be displayed in the module.
 */
interface ModuleProps {
  /**
   * The content to be displayed in the module.
   * @type {JSX.Element}
   */
  content: JSX.Element;
}

/**
 * A module component. This is a generic version of the modules used on the site.
 * It takes in a single prop, `content`, which is the content to be displayed in the module.
 * This component should only be used within the specific module components in the `modules` directory, and should not be used directly in the app.
 * Only specific module components should be used in the app, such as `WelcomeModule`.
 * @param {ModuleProps} props - The props to be passed to the component.
 * @returns {JSX.Element} The module component.
 */
export default function Module(props: ModuleProps): JSX.Element {
  return <div className="module">{props.content}</div>;
}
