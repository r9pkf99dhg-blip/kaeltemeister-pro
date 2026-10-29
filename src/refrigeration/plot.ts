import type { PHPoint } from "./data";
export interface Viewport {
  zoom: number;
  panX: number;
  panY: number;
}
export const plotBounds = {
  hMin: 50000,
  hMax: 520000,
  logMin: Math.log10(20000),
  logMax: Math.log10(4000000),
};
export function viewBounds(v: Viewport) {
  if (
    ![v.zoom, v.panX, v.panY].every(Number.isFinite) ||
    v.zoom < 1 ||
    v.zoom > 6 ||
    Math.abs(v.panX) > 1 ||
    Math.abs(v.panY) > 1
  )
    throw Error("Ungültiger Diagrammausschnitt.");
  const hRange = (plotBounds.hMax - plotBounds.hMin) / v.zoom,
    pRange = (plotBounds.logMax - plotBounds.logMin) / v.zoom;
  return {
    hMin:
      plotBounds.hMin +
      ((plotBounds.hMax - plotBounds.hMin - hRange) * (v.panX + 1)) / 2,
    hRange,
    logMin:
      plotBounds.logMin +
      ((plotBounds.logMax - plotBounds.logMin - pRange) * (v.panY + 1)) / 2,
    logRange: pRange,
  };
}
export function plotPoint(p: PHPoint, v: Viewport) {
  if (!Number.isFinite(p.p) || p.p <= 0 || !Number.isFinite(p.h))
    throw Error(
      "Ungültiger Druck oder Enthalpiewert: kein Diagrammpunkt gezeichnet.",
    );
  const b = viewBounds(v);
  return {
    x: 70 + (660 * (p.h - b.hMin)) / b.hRange,
    y: 390 - (340 * (Math.log10(p.p) - b.logMin)) / b.logRange,
  };
}
export function pathFor(points: readonly PHPoint[], v: Viewport) {
  if (points.length < 2) throw Error("Unvollständige Diagrammlinie.");
  return points
    .map((p, i) => {
      const c = plotPoint(p, v);
      return `${i ? "L" : "M"}${c.x.toFixed(3)},${c.y.toFixed(3)}`;
    })
    .join(" ");
}
export const clampPan = (v: number) => Math.max(-1, Math.min(1, v));
