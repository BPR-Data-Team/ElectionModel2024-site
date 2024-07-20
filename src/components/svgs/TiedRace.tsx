export default function TiedRace(): JSX.Element {
  return (
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          {`
            .cls-5 {
              fill: #505050;
              font-family: Gelica-Black, Gelica;
              font-size: 28px;
              font-weight: 700;
            }
          `}
        </style>
      </defs>
      <circle 
        cx="50" 
        cy="50" 
        r="43.5"
        stroke="#505050" 
        stroke-width="13"
        fill="none"
      />
      <line 
        className="cls-1" 
        x1="67.9" 
        y1="30.1" 
        x2="30.1" 
        y2="67.9"
        stroke-width="4"
        stroke="#505050" 
        fill="none"
      />
      <g>
      <text 
          x="36%" 
          y="40%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="28px"
          fontFamily="gelica"
          fontWeight="700"
          fill="#505050"
          pointerEvents="none"
          style={{ userSelect: "none" }}
        >
          D
        </text>
        <text 
          x="62%" 
          y="65%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="28px"
          fontFamily="gelica"
          fontWeight="700"
          fill="#505050"
          pointerEvents="none"
          style={{ userSelect: "none" }}
        >
          R
        </text>
      </g>
    </svg>
  );
}
