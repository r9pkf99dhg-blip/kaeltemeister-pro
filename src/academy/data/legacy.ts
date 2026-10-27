/** Übergangsbrücke: bestehende Angebote bleiben mit dem gemeinsamen Katalog verbunden. */
export const legacyBridges = [
  { moduleId: "cycle-basics", articleIds: ["kreislauf"] },
  {
    moduleId: "superheat-subcooling",
    articleIds: ["ueberhitzung", "unterkuehlung"],
  },
] as const;
