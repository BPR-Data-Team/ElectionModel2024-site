export default function TiedRace(): JSX.Element {
  return (
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="50"
        cy="50"
        r="43.5"
        stroke="#505050"
        strokeWidth="13"
        fill="none"
      />
      <text
        x="50%"
        y="54.5%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="3.5rem"
        fontFamily="gelica"
        fontWeight="700"
        fill="#505050"
        pointerEvents="none"
        style={{ userSelect: "none" }}
      >
        T
      </text>
    </svg>
  );
}
