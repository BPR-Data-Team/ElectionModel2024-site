import styles from "./Module.module.css";

/**
 * The width of the module.
 */
export enum ModuleWidth {
  FULL = "full",
  HALF = "half",
}

/**
 * The props for the module component.
 */
interface ModuleProps {
  width: ModuleWidth;
  gridRowSpan: number; // The number of rows the module should span in the grid (1-14) at desktop size
  children: JSX.Element;
}

/**
 * A module component. This is a generic version of the modules used on the site.
 * It takes in a single prop, `content`, which is the content to be displayed in the module.
 * This component should only be used within the specific module components in the `modules` directory, and should not be used directly in the app.
 * Only specific module components should be used in the app, such as `WelcomeModule`.
 * @returns {JSX.Element} The module component.
 */
export default function Module(props: ModuleProps): JSX.Element {
  return (
    <div
      className={
        styles.module +
        ` ${props.width == ModuleWidth.HALF ? styles.half : styles.full}`
      }
      style={{ gridRow: `span ${props.gridRowSpan}` }}
    >
      {props.children}
    </div>
  );
}
