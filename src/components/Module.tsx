import styles from "./Module.module.css";

export interface ModuleProps {
  className?: string; // for now, these will be defined in globals.css when used
  children: React.ReactNode;
}

/**
 * A module component. This is a generic version of the modules used on the site.
 * It takes in a single prop, `content`, which is the content to be displayed in the module.
 * This component should only be used within the specific module components in the `modules` directory, and should not be used directly in the app.
 * Only specific module components should be used in the app, such as `WelcomeModule`.
 * @returns {JSX.Element} The module component.
 */
export default function Module(props: ModuleProps): JSX.Element {
  const className = props.className
    ? styles.module + " " + props.className
    : styles.module;
  return <div className={className}>{props.children}</div>;
}
