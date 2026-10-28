import { useRef, useState } from "react";
import { refrigerantData as data, type RefrigerationCase } from "./data";
import {
  pathFor,
  plotPoint,
  viewBounds,
  clampPan,
  type Viewport,
} from "./plot";
import type { CycleDraft } from "./draft";
import { referenceProof } from "./backend";
export default function PHDiagram({
  c,
  d,
  update,
}: {
  c: RefrigerationCase;
  d: CycleDraft;
  update: (patch: Partial<CycleDraft>) => void;
}) {
  const [dragView, setDragView] = useState<Viewport | null>(null);
  const drag = useRef<{
    pointer: number;
    x: number;
    y: number;
    width: number;
    height: number;
    view: Viewport;
  } | null>(null);
  const current = useRef<Viewport | null>(null);
  const v = dragView ?? d;
  const b = viewBounds(v);
  const paths = [
    c.compression.length ? c.compression : [c.points[0], c.points[1]],
    [c.points[1], c.points[2]],
    [c.points[2], c.points[3]],
    [c.points[3], c.points[0]],
  ];
  if (!referenceProof().ok)
    return (
      <p role="alert">
        Die Diagrammdaten sind unvollständig. Es werden keine ungesicherten
        Kurven gezeichnet.
      </p>
    );
  const zoom = (n: number) => {
    const z = Math.max(1, Math.min(6, n));
    update({ zoom: z, ...(z === 1 ? { panX: 0, panY: 0 } : {}) });
  };
  const commit = () => {
    if (current.current) update(current.current);
    drag.current = null;
    current.current = null;
    setDragView(null);
  };
  return (
    <section className="ph-diagram" aria-label="Interaktives log-p-h-Diagramm">
      <h3>log-p-h · R134a · IIR</h3>
      <p id="ph-help">
        Ausschnitt mit +/− vergrößern und mit einem Finger oder den Pfeiltasten
        im Diagramm verschieben. Pos1 setzt zurück. Zustandspunkte sind auch
        über die Schaltflächen und die Wertetabelle auswählbar. Verschieben
        ändert keine Stoffwerte.
      </p>
      <div className="button-row">
        <button className="button secondary" onClick={() => zoom(d.zoom + 1)}>
          Diagramm vergrößern
        </button>
        <button className="button secondary" onClick={() => zoom(d.zoom - 1)}>
          Diagramm verkleinern
        </button>
        <button
          className="button secondary"
          onClick={() => update({ zoom: 1, panX: 0, panY: 0 })}
        >
          Ausschnitt zurücksetzen
        </button>
        <output aria-label="Vergrößerung">{d.zoom}×</output>
      </div>
      <svg
        className="ph-plot"
        viewBox="0 0 780 460"
        role="group"
        tabIndex={0}
        aria-label="log-p-h-Diagramm verschieben"
        aria-describedby="ph-help"
        onKeyDown={(e) => {
          const moves: Record<string, Partial<CycleDraft>> = {
            ArrowLeft: { panX: clampPan(d.panX - 0.15) },
            ArrowRight: { panX: clampPan(d.panX + 0.15) },
            ArrowUp: { panY: clampPan(d.panY + 0.15) },
            ArrowDown: { panY: clampPan(d.panY - 0.15) },
            Home: { zoom: 1, panX: 0, panY: 0 },
            "+": { zoom: Math.min(6, d.zoom + 1) },
            "-": { zoom: Math.max(1, d.zoom - 1) },
          };
          if (moves[e.key]) {
            e.preventDefault();
            update(moves[e.key]);
          }
        }}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          const r = e.currentTarget.getBoundingClientRect();
          drag.current = {
            pointer: e.pointerId,
            x: e.clientX,
            y: e.clientY,
            width: (r.width * 660) / 780,
            height: (r.height * 340) / 460,
            view: { zoom: d.zoom, panX: d.panX, panY: d.panY },
          };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const a = drag.current;
          if (!a || a.pointer !== e.pointerId || a.view.zoom === 1) return;
          const next = {
            zoom: a.view.zoom,
            panX: clampPan(
              a.view.panX -
                (2 * (e.clientX - a.x)) / (a.width * (a.view.zoom - 1)),
            ),
            panY: clampPan(
              a.view.panY +
                (2 * (e.clientY - a.y)) / (a.height * (a.view.zoom - 1)),
            ),
          };
          current.current = next;
          setDragView(next);
        }}
        onPointerUp={commit}
        onPointerCancel={() => {
          drag.current = null;
          current.current = null;
          setDragView(null);
        }}
      >
        <title>
          Reale Referenzzustände im logarithmischen Druck-Enthalpie-Diagramm
        </title>
        <desc>
          Sättigungsgrenzen stammen aus CoolProp. Der Hochdruckprozess liegt
          oberhalb des Niederdruckprozesses. Drosselung 3 nach 4 ist senkrecht,
          weil h gleich bleibt. Zahlen und Prozesse stehen auch in der Tabelle
          unter dem Diagramm.
        </desc>
        <defs>
          <clipPath id="ph-clip">
            <rect x="70" y="50" width="660" height="340" />
          </clipPath>
        </defs>
        <rect
          x="70"
          y="50"
          width="660"
          height="340"
          fill="#fff"
          stroke="#a4b8ad"
        />
        {Array.from({ length: 6 }, (_, i) => {
          const h = b.hMin + (b.hRange * i) / 5,
            x = 70 + (660 * i) / 5;
          return (
            <g key={i}>
              <path d={`M${x} 50V390`} stroke="#dbe5df" />
              <text x={x} y="413" textAnchor="middle">
                {(h / 1000).toFixed(0)}
              </text>
            </g>
          );
        })}
        {[0.2, 0.5, 1, 2, 5, 10, 20, 40]
          .filter(
            (p) =>
              Math.log10(p * 1e5) >= b.logMin - 1e-9 &&
              Math.log10(p * 1e5) <= b.logMin + b.logRange + 1e-9,
          )
          .map((p) => {
            const y =
              390 - (340 * (Math.log10(p * 1e5) - b.logMin)) / b.logRange;
            return (
              <g key={p}>
                <path d={`M70 ${y}H730`} stroke="#dbe5df" />
                <text x="59" y={y + 5} textAnchor="end">
                  {p.toLocaleString("de-DE")}
                </text>
              </g>
            );
          })}
        <text x="400" y="447" textAnchor="middle">
          Spezifische Enthalpie h [kJ/kg]
        </text>
        <text transform="translate(19 220) rotate(-90)" textAnchor="middle">
          Absolutdruck p [bar] · logarithmisch
        </text>
        <g clipPath="url(#ph-clip)">
          <path
            data-testid="saturation-liquid"
            d={pathFor(
              data.saturation.map((s) => ({ p: s.p, h: s.liquidH })),
              v,
            )}
            fill="none"
            stroke="#183e31"
            strokeWidth="2"
          />
          <path
            data-testid="saturation-vapor"
            d={pathFor(
              data.saturation.map((s) => ({ p: s.p, h: s.vaporH })),
              v,
            )}
            fill="none"
            stroke="#183e31"
            strokeWidth="2"
          />
          {d.showQuality &&
            Object.entries(data.qualityLines).map(([q, points]) => (
              <path
                key={q}
                d={pathFor(points, v)}
                fill="none"
                stroke="#6b8d78"
                strokeDasharray="2 5"
              />
            ))}
          {d.showIsotherms &&
            data.isotherms.flatMap((t, i) =>
              t.segments.map((seg, j) => (
                <path
                  key={`${i}-${j}`}
                  d={pathFor(seg, v)}
                  fill="none"
                  stroke="#9a718e"
                  strokeDasharray="7 4"
                />
              )),
            )}
          {d.showProcess &&
            paths.map((pts, i) => (
              <path
                key={i}
                data-testid={`process-${i + 1}`}
                d={pathFor(pts, v)}
                fill="none"
                stroke={d.component === i ? "#9e4d22" : "#287659"}
                strokeWidth={d.component === i ? 4 : 2}
                strokeDasharray={i === 0 && c.etaIs < 1 ? "6 5" : undefined}
              />
            ))}
          {c.points.map((p, i) => {
            const a = plotPoint(p, v);
            return (
              <g key={i} onClick={() => update({ point: i + 1 })}>
                <circle
                  cx={a.x}
                  cy={a.y}
                  r="10"
                  fill={d.point === i + 1 ? "#183e31" : "#fff"}
                  stroke="#183e31"
                  strokeWidth="2"
                />
                <text x={a.x + 13} y={a.y - 12} fontWeight="bold">
                  {i + 1}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <fieldset className="diagram-options">
        <legend>Diagrammlinien</legend>
        <label>
          <input
            type="checkbox"
            checked={d.showProcess}
            onChange={(e) => update({ showProcess: e.target.checked })}
          />{" "}
          Kreisprozess
        </label>
        <label>
          <input
            type="checkbox"
            checked={d.showQuality}
            onChange={(e) => update({ showQuality: e.target.checked })}
          />{" "}
          Dampfgehalt x = 0,25 / 0,50 / 0,75
        </label>
        <label>
          <input
            type="checkbox"
            checked={d.showIsotherms}
            onChange={(e) => update({ showIsotherms: e.target.checked })}
          />{" "}
          Isothermen 250 / 273,15 / 293,15 / 313,15 / 333,15 K
        </label>
      </fieldset>
      <p>
        Sättigungsgrenzen: durchgezogen; Dampfgehalt: gepunktet; Isothermen:
        gestrichelt. Die Sättigungskurven decken nur 220–365 K ab und enden
        unterhalb des kritischen Punkts. Sie werden dort nicht künstlich
        geschlossen. Verbindungen dienen der Darstellung; daraus werden keine
        zusätzlichen Stoffwerte abgelesen oder berechnet.
      </p>
      {c.etaIs < 1 && (
        <p className="notice">
          Für η_is = 0,75 verbindet die gestrichelte Verdichterlinie nur die
          berechneten Endpunkte. Sie ist kein berechneter realer
          Verdichtungspfad.
        </p>
      )}
    </section>
  );
}
