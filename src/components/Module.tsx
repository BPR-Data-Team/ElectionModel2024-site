import styles from "./Module.module.css";

/**
 * A module component. This is a generic version of the modules used on the site.
 * It takes in a single prop, `content`, which is the content to be displayed in the module.
 * This component should only be used within the specific module components in the `modules` directory, and should not be used directly in the app.
 * Only specific module components should be used in the app, such as `WelcomeModule`.
 * @returns {JSX.Element} The module component.
 */
export default function Module({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return <div className={styles.module}>{children}</div>;
}
