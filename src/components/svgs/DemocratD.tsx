/**
 *
 * @returns {JSX.Element} The DemocratD component.
 */
export default function DemocratD(): JSX.Element {
  return (
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="50"
        cy="50"
        r="43.5"
        stroke="#595d9a"
        stroke-width="13"
        fill="none"
      />
      <text
        x="50%"
        y="54.5%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-size="3.5rem"
        font-family="gelica"
        font-weight="700"
        fill="#595d9a"
        pointerEvents="none"
        style={{ userSelect: "none" }}
      >
        D
      </text>
    </svg>
  );
}
