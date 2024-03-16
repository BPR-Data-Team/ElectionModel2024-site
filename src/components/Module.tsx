interface ModuleProps {
  content: JSX.Element;
}

export default function Module(props: ModuleProps): JSX.Element {
  return <div className="module">{props.content}</div>;
}
