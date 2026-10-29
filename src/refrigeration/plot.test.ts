import { it, expect } from "vitest";
import { plotPoint, pathFor, viewBounds } from "./plot";
import { refrigerationCases, refrigerantData } from "./data";
const v = { zoom: 1, panX: 0, panY: 0 };
it("verwendet eine absolute logarithmische Druckachse und lineare SI-Enthalpie", () => {
  const a = plotPoint({ p: 1e5, h: 2e5 }, v),
    b = plotPoint({ p: 1e6, h: 3e5 }, v),
    c = plotPoint({ p: 1e7, h: 4e5 }, v);
  expect(a.y - b.y).toBeCloseTo(b.y - c.y, 10);
  expect(b.x - a.x).toBeCloseTo(c.x - b.x, 10);
  expect(() => plotPoint({ p: 0, h: 100 }, v)).toThrow();
  expect(() => plotPoint({ p: NaN, h: 100 }, v)).toThrow();
  expect(() => viewBounds({ ...v, zoom: 0 })).toThrow();
});
it("erhält Drossel-h und konstante Druckprozesse auch bei Zoom und Verschiebung", () => {
  for (const c of refrigerationCases)
    for (const viewport of [v, { zoom: 6, panX: 1, panY: -1 }]) {
      const p = c.points.map((p) => plotPoint(p, viewport));
      expect(p[2].x).toBeCloseTo(p[3].x, 9);
      expect(p[0].y).toBeCloseTo(p[3].y, 9);
      expect(p[1].y).toBeCloseTo(p[2].y, 9);
      for (const seg of refrigerantData.isotherms.flatMap((t) => t.segments))
        expect(pathFor(seg, viewport)).not.toMatch(/NaN|Infinity/);
    }
});
it("begrenzt Ausschnitte auf den echten Ausgangsbereich und verbindet keine fehlenden Linien", () => {
  const b = viewBounds(v),
    c = viewBounds({ zoom: 6, panX: 1, panY: 1 });
  expect(c.hMin + c.hRange).toBeCloseTo(b.hMin + b.hRange, 8);
  expect(c.logMin + c.logRange).toBeCloseTo(b.logMin + b.logRange, 8);
  expect(() => pathFor([], v)).toThrow();
});
