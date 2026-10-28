/** Überschriften, IDs, gemeinsame Sicherheits-/Quellenhinweise bleiben am ursprünglichen Artikel. */
export const simpleArticles: Record<string, string[]> = {
  kreislauf: [
    "Eine Kälteanlage transportiert Wärme. Das Kältemittel nimmt im Verdampfer Wärme aus dem kalten Bereich auf und gibt sie im Verflüssiger wieder ab. Der Verdichter braucht dafür Antriebsenergie.",
    "Nach dem Expansionsorgan liegt im beschriebenen Modell ein Flüssigkeits-Dampf-Gemisch bei niedrigem Druck vor. Im Verdampfer nimmt es Wärme auf. Flüssigkeit wird zu Dampf. Im normalen betrachteten Betrieb verlässt trockener, etwas überhitzter Dampf den Verdampfer.",
    "Der Verdichter erhöht Druck und Temperatur des Dampfes durch Arbeit. Flüssigkeit soll nicht hinein gelangen: Sie lässt sich kaum zusammendrücken und kann Schäden verursachen. Die elektrische Energie wird dem System zugeführt; reale Verluste und Systemgrenzen sind zu beachten.",
    "Im Verflüssiger gibt der heiße Dampf Wärme ab und wird flüssig. Die abgegebene Wärme enthält näherungsweise die zuvor aufgenommene Kältewärme und die zugeführte Verdichterenergie. Danach kann die Flüssigkeit weiter abkühlen.",
    "Das Expansionsorgan senkt den Druck durch Drosseln. Im idealisierten Modell bleibt die spezifische Enthalpie dabei gleich. Das heißt nicht, dass die Temperatur gleich bleibt. Ein Teil der Flüssigkeit verdampft; das Gemisch gelangt wieder zum Verdampfer.",
  ],
  ueberhitzung: [
    "Du vergleichst die wirkliche Dampftemperatur mit der Sättigungstemperatur beim örtlichen Druck. Dampftemperatur minus Sättigungstemperatur heißt Überhitzung. Das Ergebnis ist ein Temperaturunterschied in Kelvin.",
    "Die vorgegebene Sättigungstemperatur ist −10 °C, die gemessene Rohrtemperatur am selben Ort −4 °C. Du rechnest −4 − (−10) = 6 K. Druckverluste können wichtig sein. Werte von verschiedenen Orten dürfen nicht einfach zusammen verwendet werden.",
    "Eine passende Überhitzung hilft, trockenen Dampf am Verdampferausgang zu erhalten. Sehr wenig kann auf mitgerissene Flüssigkeit hinweisen. Viel Überhitzung kann zum Beispiel durch geringe Zufuhr oder zusätzliche Saugleitungserwärmung entstehen. Ein einzelner Wert beweist keine bestimmte Ursache.",
    "Bei zeotropen Gemischen ist für die Überhitzung der Taupunkt, auch Dew genannt, maßgeblich. Messgerät, Kältemittel und Druckbezug müssen passen. Temperaturmessungen benötigen guten Kontakt und passende Abschirmung gegen Umgebungseinflüsse. Sollwerte hängen von Hersteller und Betriebszustand ab; praktische Arbeiten erfordern Qualifikation.",
  ],
  unterkuehlung: [
    "Nach vollständigem Verflüssigen kann die Flüssigkeit weiter abkühlen. Du rechnest Sättigungstemperatur minus Flüssigkeitstemperatur. Dieser Temperaturunterschied ist die Unterkühlung und wird in Kelvin angegeben.",
    "Sind beim örtlichen Druck 40 °C Sättigungstemperatur vorgegeben und an derselben Stelle 35 °C Flüssigkeitstemperatur, ergibt das 40 − 35 = 5 K. Verwende zusammengehörige Druck- und Temperaturwerte.",
    "Unterkühlung schafft im Modell eine Reserve gegen frühe Dampfblasen. Druckverlust und zusätzliche Wärme können diese Reserve verkleinern. Dampf vor dem Expansionsorgan kann die Versorgung stören. Welche Unterkühlung passt, hängt von Anlage und Hersteller ab.",
    "Bei zeotropen Gemischen verwendest du für Unterkühlung den Siedepunkt, auch Bubble genannt. Ein einzelner Unterkühlungswert beweist keine bestimmte Füllmenge. Aufbau, Sammler, Last und Messort beeinflussen ihn. Am echten Kältekreis dürfen nur entsprechend qualifizierte Personen arbeiten.",
  ],
};
