import type { Source } from '../model';
import type { SourceEvaluation } from '../../quality/evidence';
const mathCommit = '463991614337632b0e02cbb6c76223cbb0d423d3';
const physicsCommit = '66fcef29596e3a32818162b837dd0c85b754cbad';
export const deepSources: Source[] = [
 {id:'openstax-precalculus-v06',title:'OpenStax: Precalculus 2e / Algebra and Trigonometry 2e',access:'consulted',url:`https://github.com/openstax/osbooks-college-algebra-bundle/blob/${mathCommit}/collections/precalculus-2e.collection.xml`,reviewedCommit:mathCommit,accessedAt:'2026-10-28',locator:'m51283 Angles; m51284 Right Triangle Trigonometry; m51256 Quadratic Equations; m49301 Functions and Function Notation; m49326 Modeling with Linear Functions; m49363 Logarithmic Functions. Kapitel im gemeinsamen offiziellen Bucharchiv.',supports:'Trigonometrische Definitionen, Winkelmaß, Gleichungs- und Funktionsregeln; konkrete Quellenbelege begrenzen ihren Umfang.',license:'CC BY-NC-SA 4.0 laut LICENSE',note:'Offizielles Git-Archiv tatsächlich gelesen. Eigene Texte, Rechnungen und Zeichnungen; kein Volltext oder fremde Abbildung übernommen.'},
 {id:'openstax-thermal-v06',title:'OpenStax: College Physics 2e – Wärmeübertragung und erster Hauptsatz',access:'consulted',url:`https://github.com/openstax/osbooks-college-physics-bundle/blob/${physicsCommit}/collections/college-physics-2e.collection.xml`,reviewedCommit:physicsCommit,accessedAt:'2026-10-28',locator:'m42224 Temperature Change and Heat Capacity; m42225 Phase Change and Latent Heat; m42226 Heat Transfer Methods; m42228 Conduction; m42229 Convection; m42230 Radiation; m42232 The First Law of Thermodynamics.',supports:'Wärmekapazität, Phasenwechsel, Wärmeübertragungsmechanismen und geschlossene Energiebilanz. Eigene stationäre Ableitungen mit ausdrücklich angegebenen Annahmen.',license:'CC BY-NC-SA 4.0 laut LICENSE',note:'Originalmodule tatsächlich gelesen, keine realen Stoffwerte oder Anlagenfreigabe abgeleitet.'},
 ...[
 ['meisterverordnung-v06','Kälteanlagenbauermeisterverordnung','https://www.gesetze-im-internet.de/k_lteanlmstrv/'],
 ['ausbildungsrahmenplan-v06','Ausbildungsrahmenplan Mechatroniker für Kältetechnik','https://www.gesetze-im-internet.de/k_ltemechaausbv/anlage.html'],
 ['kmk-rahmenplan-v06','KMK: Rahmenlehrpläne','https://www.kmk.org/service/servicebereich-berufliche-schulen/downloadbereich-rahmenlehrplaene.html'],
 ['bipm-si-v06','BIPM: SI Brochure','https://www.bipm.org/en/publications/si-brochure'],
 ['dguv-elektrisch-v06','DGUV: Sicherheit bei Arbeiten an elektrischen Anlagen','https://publikationen.dguv.de/regelwerk/dguv-informationen/284/sicherheit-bei-arbeiten-an-elektrischen-anlagen'],
 ].map(([id,title,url]):Source=>({id,title,url,access:'unavailable',note:'Abruf am 28.10.2026 durch Netzwerk-HTTP 403 blockiert. Nicht eingesehen; keine daraus bestätigte Rechts-, Norm- oder Sicherheitsbehauptung. Aktueller Inhalt und Eignung noch durch Fachperson zu prüfen.'})),
];
export const sourceEvaluations: SourceEvaluation[] = deepSources.map(s=>({
 sourceId:s.id,type:s.id.includes('verordnung')||s.id.includes('ausbildungs')?'law':s.id.includes('kmk')?'curriculum':s.id.includes('bipm')?'si':s.id.includes('dguv')?'safety':'textbook',
 authority:s.access==='consulted'?'Offizielles OpenStax-Bucharchiv, anerkannte offene Hochschullehre.':'Vorgesehene offizielle Institution; tatsächlicher aktueller Text nicht eingesehen.',
 suitability:s.supports??'Geplante fachliche Orientierung; kein belastbarer Aussagenabgleich möglich.',
 currency:s.reviewedCommit?`Festgeschriebener Stand ${s.reviewedCommit}, gelesen am ${s.accessedAt}. Keine Behauptung der neuesten Webausgabe.`:'Aktualität und Gültigkeit offen.',
 limitations:'Lehrquelle ist keine Norm und keine praktische Freigabe. Eigene deutsche Transfertexte und Beispiele benötigen unabhängige Fachprüfung.',
 conflicts:'Kein vollständiger fachübergreifender Widerspruchsabgleich erfolgt. Unterschiedliche Vorzeichenkonventionen und Systemgrenzen werden jeweils genannt.',
}));
