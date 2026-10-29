import { componentNames } from "./qualitative";
export default function CycleSchematic({
  component,
  point,
  selectComponent,
  selectPoint,
  moving,
}: {
  component: number;
  point: number;
  selectComponent: (i: number) => void;
  selectPoint: (i: number) => void;
  moving: boolean;
}) {
  const nodes = [
      [100, 220],
      [380, 80],
      [660, 220],
      [380, 360],
    ],
    points = [
      [100, 315],
      [220, 80],
      [660, 125],
      [535, 360],
    ];
  return (
    <section aria-label="Interaktives Kreislaufschema">
      <svg
        className={`refrigeration-schematic ${moving ? "flow-running" : ""}`}
        viewBox="0 0 760 460"
        role="img"
        aria-labelledby="cycle-svg-title cycle-svg-desc"
      >
        <title id="cycle-svg-title">
          Vier Bauteile im geschlossenen Kältekreislauf
        </title>
        <desc id="cycle-svg-desc">
          Strömungsfolge: Verdampfer zu Punkt 1, Verdichter zu Punkt 2,
          Verflüssiger zu Punkt 3, Expansionsorgan zu Punkt 4. Hochdruck oben
          und rechts, Niederdruck unten und links. Auswahl über die
          gleichnamigen Schaltflächen unter dem Schema.
        </desc>
        <defs>
          <marker
            id="cycle-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0 0L10 5L0 10Z" fill="currentColor" />
          </marker>
        </defs>
        <path d="M100 220 V80 H660 V220" className="cycle-pipe high" />
        <path d="M660 220 V360 H100 V220" className="cycle-pipe low" />
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          markerEnd="url(#cycle-arrow)"
        >
          <path d="M255 80H290" />
          <path d="M660 260V290" />
          <path d="M280 360H245" />
          <path d="M100 165V135" />
        </g>
        <text x="380" y="28" textAnchor="middle">
          Hochdruck · Wärmeabgabe Q̇ₖ ↑
        </text>
        <text x="380" y="425" textAnchor="middle">
          Niederdruck · Wärmeaufnahme Q̇₀ ↑
        </text>
        <text x="32" y="272">
          Arbeit →
        </text>
        {nodes.map(([x, y], i) => (
          <g
            key={i}
            onClick={() => selectComponent(i)}
            className="schematic-node"
            style={{ cursor: "pointer" }}
          >
            <rect
              x={x - 85}
              y={y - 24}
              width="170"
              height="48"
              rx="12"
              fill={component === i ? "#dff2e5" : "white"}
              stroke={component === i ? "#176246" : "#748b83"}
              strokeWidth={component === i ? 3 : 1.5}
            />
            <text x={x} y={y + 5} textAnchor="middle">
              {componentNames[i]}
            </text>
          </g>
        ))}
        {points.map(([x, y], i) => (
          <g
            key={i}
            onClick={() => selectPoint(i + 1)}
            style={{ cursor: "pointer" }}
          >
            <circle
              cx={x}
              cy={y}
              r="18"
              fill={point === i + 1 ? "#183e31" : "white"}
              stroke="#183e31"
              strokeWidth="2"
            />
            <text
              x={x}
              y={y + 5}
              textAnchor="middle"
              fill={point === i + 1 ? "white" : "#183e31"}
            >
              {i + 1}
            </text>
          </g>
        ))}
      </svg>
      <p>
        Schema ohne geometrischen Maßstab. Bewegung zeigt nur die
        Strömungsrichtung, keine gemessene Geschwindigkeit oder
        Massenstrommenge.
      </p>
      <div className="button-row" aria-label="Bauteil auswählen">
        {componentNames.map((name, i) => (
          <button
            key={name}
            className="button secondary"
            aria-pressed={component === i}
            onClick={() => selectComponent(i)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="button-row" aria-label="Zustand auswählen">
        {points.map((_, i) => (
          <button
            key={i}
            className="button secondary"
            aria-pressed={point === i + 1}
            onClick={() => selectPoint(i + 1)}
          >
            Zustand {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
