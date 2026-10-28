import type{Term}from "../academy/model";
export const cycleConcepts=[
  {
    "id": "refrig-state",
    "title": "Thermodynamischer Zustand",
    "simple": "Zustand heißt: So ist der Stoff gerade an dieser Stelle.",
    "technical": "Ein thermodynamischer Gleichgewichtszustand wird durch geeignete unabhängige Zustandsgrößen beschrieben.",
    "unit": "abhängig von Größe",
    "example": "Reines R134a außerhalb der Sättigung kann etwa durch p und T bestimmt sein.",
    "mistake": "P und T legen im Zweiphasengleichgewicht x nicht zusätzlich fest.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "foundation-pressure",
    "title": "Druck",
    "simple": "Druck beschreibt die Belastung einer Fläche. Der Bezug muss bekannt sein.",
    "technical": "Im einfachen Modell ist p die senkrechte Kraft pro Fläche; im Diagramm gilt Absolutdruck.",
    "unit": "Pa; bar = 100000 Pa",
    "example": "2 bar absolut sind 200000 Pa absolut.",
    "mistake": "Überdruck und Absolutdruck sind nicht dieselben Bezugsgrößen.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "refrig-temperature",
    "title": "Temperatur",
    "simple": "Temperatur beschreibt den thermischen Zustand, nicht eine gespeicherte Wärmemenge.",
    "technical": "Temperatur ist eine intensive Zustandsgröße; bei Phasenwechsel kann bei konstantem Druck Wärme ohne Temperaturänderung übertragen werden.",
    "unit": "K bzw. °C",
    "example": "0 °C entspricht 273,15 K.",
    "mistake": "Temperatur mit Wärmeenergie oder Enthalpie gleichsetzen.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "refrig-absolute-temperature",
    "title": "Absolute Temperatur",
    "simple": "Kelvin beginnt beim absoluten Temperaturnullpunkt.",
    "technical": "Thermodynamische absolute Temperatur T; zur Celsiusskala gilt T/K = t/°C + 273,15.",
    "unit": "K",
    "example": "−10 °C entsprechen 263,15 K; eine Differenz von 5 °C entspricht 5 K.",
    "mistake": "Den Offset auf Temperaturdifferenzen anwenden oder negative Kelvin verwenden.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "foundation-density",
    "title": "Dichte",
    "simple": "Dichte sagt, welche Masse in einem bestimmten Volumen steckt.",
    "technical": "Massendichte ρ = m/V ist stoff- und zustandsabhängig.",
    "unit": "kg/m³",
    "example": "Im Katalog unterscheiden sich Flüssigkeits- und Dampfdichte am selben Sättigungsdruck stark.",
    "mistake": "Eine einzige konstante Dichte für Flüssigkeit und Dampf annehmen.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "refrig-specific-volume",
    "title": "Spezifisches Volumen",
    "simple": "Das ist der Platz, den ein Kilogramm des Stoffes einnimmt.",
    "technical": "Spezifisches Volumen v = V/m = 1/ρ für positive Dichte.",
    "unit": "m³/kg",
    "example": "Bei vorgegebener Dichte 1000 kg/m³ ist v = 0,001 m³/kg; dies ist ein Rechenbeispiel, kein universeller R134a-Wert.",
    "mistake": "Volumen, Volumenstrom und spezifisches Volumen verwechseln.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "enthalpie",
    "title": "Enthalpie",
    "simple": "Die Enthalpie H gehört zur betrachteten Stoffmenge; pro Kilogramm heißt sie h.",
    "technical": "Extensive Enthalpie H = U + pV; spezifische Enthalpie h = H/m. Referenzabhängige Absolutwerte sind nicht automatisch nutzbare Wärme.",
    "unit": "H in J; h in J/kg",
    "example": "Bei gleichen Zuständen wächst H mit der Masse; h bleibt gleich.",
    "mistake": "H in J mit h in J/kg oder mit Temperatur verwechseln.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "refrig-specific-enthalpy",
    "title": "Spezifische Enthalpie",
    "simple": "h hilft, die Energieänderung pro Kilogramm zwischen zwei Zuständen zu bilanzieren.",
    "technical": "h = u + pv; Differenzen bei gleicher Referenz gehen in geeignete stationäre offene Energiebilanzen ein.",
    "unit": "J/kg oder kJ/kg",
    "example": "IIR setzt Sattflüssigkeit bei 0 °C auf 200 kJ/kg. Eine gemeinsame Referenzverschiebung ändert passende Differenzen nicht.",
    "mistake": "IIR- und ASHRAE-Werte unbemerkt in einer Differenz mischen.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "refrig-entropy",
    "title": "Spezifische Entropie",
    "simple": "s ist eine eigene Zustandsgröße. Bei idealer adiabatischer und reversibler Verdichtung bleibt sie gleich.",
    "technical": "Für reversible Wärmeübertragung ist dS = δQrev/T; im idealen adiabatischen reversiblen Fluidprozess ist s konstant. Irreversibilität erzeugt Entropie.",
    "unit": "J/(kg·K) für s; J/K für S",
    "example": "Der ideale Endzustand 2s wird aus p2 und s1 bestimmt.",
    "mistake": "Adiabatisch allein mit reversibel oder isentrop gleichsetzen.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "refrig-phase-boundary",
    "title": "Phasengrenze",
    "simple": "Hier beginnt oder endet der Übergang zwischen Flüssigkeit und Dampf.",
    "technical": "Sättigungsgrenzen trennen im dargestellten subkritischen Reinstoffmodell Flüssigkeits-, Zweiphasen- und Dampfgebiet.",
    "unit": "Zustände mit p, T, h",
    "example": "Die beiden Kurven sind Sattflüssigkeits- und Sattdampfgrenze aus HEOS::R134a.",
    "mistake": "Beliebige dekorative Kurven als reale Stoffgrenzen zeichnen.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "refrig-saturated-liquid",
    "title": "Sattflüssigkeit",
    "simple": "Die Flüssigkeit steht unter den passenden Bedingungen am Beginn der Verdampfung.",
    "technical": "Grenzzustand x = 0 im Flüssigkeits-Dampf-Gleichgewicht eines reinen Stoffes.",
    "unit": "x = 0; h in J/kg",
    "example": "Der Generator verwendet das Zustandspaar T,Q=0 statt eines mehrdeutigen P,T-Paares genau auf der Sättigung.",
    "mistake": "Sattflüssigkeit mit unterkühlter Flüssigkeit gleichsetzen.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "refrig-saturated-vapor",
    "title": "Sattdampf",
    "simple": "Der letzte Flüssigkeitsanteil ist gerade verdampft.",
    "technical": "Grenzzustand x = 1 an der Sattdampfgrenze; weitere Erwärmung bei gleichem Druck führt zu Überhitzung.",
    "unit": "x = 1; h in J/kg",
    "example": "Der Generator nutzt T,Q=1 für die Sattdampflinie.",
    "mistake": "Sattdampf ohne zusätzliche Angabe als überhitzt bezeichnen.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "refrig-wet-region",
    "title": "Nassdampfgebiet",
    "simple": "Hier sind Flüssigkeit und Dampf gemeinsam vorhanden.",
    "technical": "Zweiphasengebiet des reinen Stoffes zwischen x = 0 und x = 1 bei Gleichgewichtsbedingungen.",
    "unit": "0 ≤ x ≤ 1",
    "example": "Zustand 4 liegt in den gewählten Katalogfällen in diesem Gebiet.",
    "mistake": "P und T als zwei unabhängige Größen betrachten oder das Gemisch als ideale Gasphase behandeln.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "refrig-quality",
    "title": "Dampfgehalt",
    "simple": "x ist der Anteil der Dampfmasse an der gesamten Masse.",
    "technical": "x = mDampf/(mFlüssigkeit + mDampf); bei gleichem Sättigungsdruck gilt h = hfl + x(hd − hfl).",
    "unit": "1 bzw. Massenanteil",
    "example": "x = 0,25 bedeutet 25 % Dampfmasse, nicht 25 % Volumen.",
    "mistake": "x außerhalb des Zweiphasengebiets als physikalischen Prozentwert ausgeben.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "ueberhitzung",
    "title": "Überhitzung",
    "simple": "Der Dampf ist wärmer als die passende Sättigungstemperatur.",
    "technical": "Differenz von Dampftemperatur und zugehöriger Sattdampftemperatur bei passendem Druck; bei Gemischen passenden Dew-Bezug beachten.",
    "unit": "K",
    "example": "Zustand 1 liegt im Basiskatalog 5 K über der R134a-Verdampfungstemperatur.",
    "mistake": "Beliebigen Messdruck oder bei Gemischen den falschen Sättigungsbezug verwenden.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "unterkuehlung",
    "title": "Unterkühlung",
    "simple": "Die Flüssigkeit ist kälter als die passende Sättigungsflüssigkeit.",
    "technical": "Differenz der passenden Sattflüssigkeitstemperatur und Flüssigkeitstemperatur; bei Gemischen Bubble-Bezug beachten.",
    "unit": "K",
    "example": "Zustand 3 liegt im Basiskatalog 3 K unter der Verflüssigungstemperatur.",
    "mistake": "Unterkühlung als negativen absoluten Temperaturwert interpretieren.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "verdichtung",
    "title": "Verdichtung",
    "simple": "Der Verdichter erhöht den Druck und benötigt dafür Arbeit.",
    "technical": "Im hier adiabatischen stationären Modell steigt h um die spezifische Fluidverdichterarbeit; ideal gilt s2s = s1.",
    "unit": "p in Pa, w in J/kg",
    "example": "1→2 führt vom Nieder- zum Hochdruckniveau.",
    "mistake": "Fluidarbeit mit der gesamten elektrischen Anlagenaufnahme gleichsetzen.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "drosselung",
    "title": "Drosselung",
    "simple": "Das Expansionsorgan senkt den Druck; im Modell bleibt h gleich.",
    "technical": "Adiabatischer stationärer Drosselprozess ohne Wellenarbeit und relevante Änderungen kinetischer/potenzieller Energie: h4 = h3.",
    "unit": "h in J/kg, p in Pa",
    "example": "3→4 ist im log-p-h bei gleichem h eine vertikale Linie nach unten.",
    "mistake": "Isenthalp mit isentrop oder allgemein isotherm gleichsetzen.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "verdampfung",
    "title": "Verdampfung",
    "simple": "Der Stoff nimmt Wärme auf und geht von Flüssigkeit zu Dampf über.",
    "technical": "Im idealisierten Verdampfer erfolgt Wärmeaufnahme auf niedrigem konstantem Druckniveau; gesamte Modellstrecke q0 = h1 − h4.",
    "unit": "q0 J/kg; Q̇0 W",
    "example": "Bei konstantem ṁ verdoppelt doppelte passende Enthalpiedifferenz die Modellleistung.",
    "mistake": "Den Phasenwechsel allein mit cpΔT beschreiben.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  },
  {
    "id": "kondensation",
    "title": "Verflüssigung",
    "simple": "Der Dampf gibt Wärme ab und wird wieder flüssig.",
    "technical": "Die idealisierte Hochdruckstrecke umfasst Enthitzung, Kondensation und hier zugeordnete Unterkühlung; qk = h2 − h3.",
    "unit": "qk J/kg; Q̇k W",
    "example": "Im selben stationären Modell ist die Wärmeabgabe gleich Wärmeaufnahme plus Fluidverdichterarbeit.",
    "mistake": "Nur q0 als Verflüssigerwärme ansetzen und die Verdichterarbeit vergessen.",
    "sourceIds": [
      "coolprop-r134a-v08"
    ],
    "moduleIds": [
      "refrig-state-v08",
      "refrig-phase-v08",
      "refrig-cycle-v08",
      "refrig-compression-v08"
    ]
  }
] ;
export function enrichRefrigerationTerms(original:Term[]):Term[]{const result=original.map(t=>{const c=cycleConcepts.find(c=>c.id===t.id);return c?{...t,moduleIds:[...new Set([...t.moduleIds,...c.moduleIds])],detail:c}:t;});for(const c of cycleConcepts)if(!result.some(t=>t.id===c.id))result.push({id:c.id,title:c.title,definition:c.technical,moduleIds:c.moduleIds,detail:c});return result;}
