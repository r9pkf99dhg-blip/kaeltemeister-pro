# Interaktiver Kältekreislauf · Version 0.8

## Bedienung und Modellstufen

Navigation **Kältekreislauf**. Modell A erklärt den stationären einstufigen Kompressionsprozess ohne exakte erfundene Stoffwerte. Komponenten und Zustände sind über Schema und Tastatur-/Touch-Schaltflächen auswählbar. Eingang und Ausgang, Druckniveau, Phase, Energieübertragung und beide Erklärungsebenen bleiben zusammenhängend. Die freiwillige Bewegung zeigt nur die Strömungsrichtung; sie ist pausierbar und bei reduzierter Bewegung ausgeschaltet.

**Modell B** enthält acht vollständig vorab berechnete R134a-Referenzfälle aus CoolProp 7.2.0/HEOS/IIR. Nur vorhandene Fälle lassen sich auswählen. Temperaturen, Überhitzung, Unterkühlung und η_is sind keine frei kombinierbaren Schieberegler. Der positive Massenstrom kann innerhalb eines ausdrücklich didaktischen Bereichs 0–1 kg/s erkundet werden: zunächst vermuten, anschließend Leistungen vergleichen. Diese freie Erkundung vergibt keine Kompetenznachweise.

**Modell C**, freie Stoffzustände im Browser, ist nicht freigegeben. Siehe [PROPERTY_BACKEND](PROPERTY_BACKEND.md). R134a dient dem Lernen, nicht als Empfehlung für reale neue Anlagen.

## Einheitliche Zustandsnummern

| Zustand | Schnittstelle | Druck / Phase im Referenzfall |
| --- | --- | --- |
| 1 | Verdampferaustritt / Verdichtereintritt | Niederdruck, überhitzter Dampf |
| 2 | Verdichteraustritt / Verflüssigereintritt | Hochdruck, überhitzter Dampf |
| 3 | Verflüssigeraustritt / Drosseleintritt | Hochdruck, unterkühlte Flüssigkeit |
| 4 | Drosselaustritt / Verdampfereintritt | Niederdruck, Flüssigkeit-Dampf-Gemisch |

1→2 Verdichtung, 2→3 Enthitzung/Kondensation/Unterkühlung, 3→4 Drosselung, 4→1 Verdampfung/Überhitzung. Ein Phasenwechsel eines reinen Stoffs bei konstantem Druck kann Wärme übertragen, obwohl die Temperatur dabei gleich bleibt. `cp ΔT` ersetzt dafür keine passende Enthalpiedifferenz.

## Eine gemeinsame Bilanz

`src/technical/refrigeration.ts` ist der gemeinsame Fachkern für Darstellung, Aufgaben und vorhandenen Berechnungsdispatch. Positive Beträge: q₀ = h₁ − h₄, w = h₂ − h₁, qₖ = h₂ − h₃, h₄ = h₃, qₖ = q₀ + w. q in J/kg, nicht W. Leistungen: ṁq₀, ṁw, ṁqₖ in W. Fluid-COP = q₀/w ist dimensionslos; Motor-, Umrichter- und Hilfsantriebsverluste fehlen. Kein allgemeiner elektrischer Gesamtwirkungsgrad wird erfunden.

η_is = (h₂s − h₁)/(h₂ − h₁); 2s wird aus p₂ und s₁ bestimmt. η_is = 1 liefert den ideal-isentropen Vergleich. Der 0,75-Fall bestimmt nur den Austrittszustand; die gestrichelte Endpunktverbindung ist kein berechneter realer Verdichterpfad.

Annahmen: stationär, adiabater Verdichter, keine Druckverluste, Drossel ohne Wärme/Wellenarbeit, Änderungen kinetischer/potenzieller Energie vernachlässigt. q₀ umfasst die modellierte Überhitzung, die nicht automatisch vollständig dem Nutzkühlraum zugutekommt. Nullförderung liefert null Leistungen, das formale Enthalpieverhältnis ist dann kein Betriebs-COP.

## Lernpfad und Speicherung

Sechs referenzierte Missionen: Komponenten → Zustände → Enthalpie → selbst rechnen → interpretieren → Transfer. Dazu Wärme-, Elektro- und Einheitenmission. Bestehende Werkstatt mit Rechenblatt, gestufter Hilfe und demselben Grader. Drei Diagrammzuordnungen und ein konkret begrenzter Fallvergleich sind auch als Textaufgaben zugänglich. Das bloße Erkunden eines Diagramms überschreibt keinen vorhandenen Werkstattentwurf.

`cycleDraft` bleibt optional im bestehenden v3-Fortschritt: Modus, Datenrevision, Fall, Zustand/Komponente, Massenstromrohtext und bestätigter Wert, Linien, Zoom/Pan. Unbekannte Datenrevisionen fallen sichtbar auf A zurück. Ungültiger Rohtext bleibt erhalten, die letzte bestätigte Bilanz bleibt gültig. Neues Öffnen einer Aufgabe wechselt den einzelnen Werkstattentwurf ausdrücklich; es gibt noch kein allgemeines Mehrblatt-Arbeitsheft.

[Validierung und Grenzen](CYCLE_VALIDATION.md), [Stoffdaten](REFRIGERANT_DATA.md), [Diagramm](LOG_PH_DIAGRAM.md). Menschliche Fachfreigabe offen; kein Werkzeug zur uneingeschränkten Anlagenplanung.
