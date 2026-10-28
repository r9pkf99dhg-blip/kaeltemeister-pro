import { expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import {
  refrigerantData as d,
  refrigerationCases,
  getRefrigerationCase,
} from "./data";
it("pinnt Herkunft, Referenzniveau und unverändertes reproduzierbares Artefakt", () => {
  expect(d.metadata.version).toBe("7.2.0");
  expect(d.metadata.gitRevision).toBe(
    "98b3523d5daa98454618d381d2ae53f7471d216b",
  );
  expect(d.metadata.reference).toContain("IIR");
  expect(d.metadata.operatingMode).toBe(
    "closed-catalogue-no-interpolation-no-extrapolation",
  );
  const bytes = readFileSync("src/refrigeration/data/r134a-v1.json");
  expect(createHash("sha256").update(bytes).digest("hex")).toBe(
    readFileSync("src/refrigeration/data/r134a-v1.sha256", "utf8").trim(),
  );
  expect(d.metadata.criticalT).toBeCloseTo(374.21, 1);
  expect(Math.abs(d.metadata.criticalP - 4059280)).toBeLessThan(20);
  expect(() => getRefrigerationCase("unknown")).toThrow();
});
it("bestätigt Sättigungsdrücke durch getrennte Auswertung der dokumentierten R134a-Ancillary", () => {
  const a = d.ancillaryPressure;
  for (const row of d.saturation) {
    const theta = 1 - row.T / a.T_r;
    const sum = a.n.reduce((s, n, i) => s + n * theta ** a.t[i], 0);
    const approximate = a.reducing_value * Math.exp((a.T_r / row.T) * sum);
    expect(Math.abs(approximate / row.p - 1)).toBeLessThan(0.00012);
    expect(row.liquidH).toBeLessThan(row.vaporH);
    expect(row.liquidRho).toBeGreaterThan(row.vaporRho);
    expect(row.T).toBeLessThan(d.metadata.criticalT);
  }
});
it("prüft unabhängig die Clapeyron-Identität gegen numerische Sättigungssteigungen", () => {
  for (let i = 1; i < d.saturation.length - 1; i++) {
    const a = d.saturation[i - 1],
      b = d.saturation[i + 1],
      m = d.saturation[i];
    const slope = (b.p - a.p) / (b.T - a.T);
    const analytical =
      (m.vaporH - m.liquidH) / (m.T * (1 / m.vaporRho - 1 / m.liquidRho));
    expect(Math.abs(slope / analytical - 1)).toBeLessThan(0.002);
  }
});
it("zeichnet Qualität und Isothermen phasengerecht aus echten Zustandsdaten", () => {
  expect(d.saturation).toHaveLength(201);
  expect(d.metadata.drawingMidpointError.maxH_Jkg).toBeLessThan(8);
  expect(d.metadata.drawingMidpointError.maxLog10P).toBeLessThan(0.00002);
  for (const [q, line] of Object.entries(d.qualityLines))
    for (let i = 0; i < line.length; i++) {
      const sat = d.saturation[i];
      expect(line[i].p).toBeCloseTo(sat.p, 5);
      expect(line[i].h).toBeCloseTo(
        sat.liquidH + Number(q) * (sat.vaporH - sat.liquidH),
        5,
      );
    }
  for (const iso of d.isotherms) {
    expect(iso.segments).toHaveLength(3);
    const wet = iso.segments[1];
    expect(wet[0].p).toBe(wet[1].p);
    expect(wet[0].h).toBeLessThan(wet[1].h);
    for (const segment of iso.segments)
      for (const p of segment) {
        expect(p.p).toBeGreaterThan(0);
        expect(Number.isFinite(p.h)).toBe(true);
      }
  }
});
it.each(refrigerationCases)(
  "$id besitzt physikalisch konsistente Zustände und einen erklärten Verdichterpfad",
  (c) => {
    expect(c.points).toHaveLength(4);
    const [a, b, e, f] = c.points;
    expect(a.p).toBeCloseTo(f.p, 4);
    expect(b.p).toBeCloseTo(e.p, 4);
    expect(a.p).toBeLessThan(b.p);
    expect(b.p).toBeLessThan(d.metadata.criticalP);
    expect(e.h).toBe(f.h);
    expect(a.h).toBeGreaterThan(f.h);
    expect(b.h).toBeGreaterThan(a.h);
    expect(f.quality).toBeGreaterThan(0);
    expect(f.quality).toBeLessThan(1);
    expect(
      Math.abs((c.isentropicOutlet.h - a.h) / (b.h - a.h) - c.etaIs),
    ).toBeLessThan(1e-8);
    if (c.etaIs === 1) {
      expect(b.s).toBeCloseTo(a.s, 5);
      expect(c.compression).toHaveLength(41);
    } else {
      expect(b.s).toBeGreaterThan(a.s);
      expect(c.compression).toHaveLength(0);
    }
    for (const p of c.points)
      for (const value of [p.p, p.h, p.T, p.rho, p.s])
        expect(Number.isFinite(value)).toBe(true);
  },
);
