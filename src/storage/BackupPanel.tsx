import { useEffect, useRef, useState } from "react";
import type { AcademyProgress } from "../academy/model";
import type { Progress } from "../logic";
import {
  createBackup,
  MAX_BACKUP_BYTES,
  parseBackup,
  restoreBackup,
  type Backup,
} from "./backup";

export default function BackupPanel({
  academy,
  legacy,
  blocked,
  importBlocked,
  onRestored,
}: {
  academy: AcademyProgress;
  legacy: Progress;
  blocked: boolean;
  importBlocked: boolean;
  onRestored: () => void;
}) {
  const [preview, setPreview] = useState<Backup | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const [download, setDownload] = useState<{
    url: string;
    name: string;
  } | null>(null);
  const urlRef = useRef<string | null>(null);
  const request = useRef(0);
  useEffect(
    () => () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );
  function report(error: unknown) {
    setFailed(true);
    setMessage(
      error instanceof Error
        ? error.message
        : "Die Datensicherung konnte nicht verarbeitet werden.",
    );
  }
  function exportFile() {
    try {
      const backup = createBackup(academy, legacy, localStorage);
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(backup, null, 2)], {
          type: "application/json",
        }),
      );
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = url;
      setDownload({
        url,
        name: `kaeltemeister-pro-${backup.exportedAt.slice(0, 10)}.json`,
      });
      setFailed(false);
      setMessage(
        "Sicherung erstellt. Tippe auf „Sicherungsdatei herunterladen“ und speichere die JSON-Datei in „Dateien“.",
      );
    } catch (error) {
      report(error);
    }
  }
  return (
    <section className="academy-panel backup-panel" aria-label="Datensicherung">
      <h2>Deine Lerndaten sichern</h2>
      <p>
        Nur auf deinem Gerät. Eine Sicherung überträgt nichts an einen Server.
        Bewahre die Datei sicher auf; sie enthält deine Antworten und
        Lernstatistiken.
      </p>
      {blocked && (
        <p>
          Die Browserspeicherung ist gesperrt. Bitte zuerst neu laden und den
          Speicherfehler beheben. Ein vollständiger Export ist derzeit nicht
          möglich. Eine vorhandene gültige Sicherung kannst du nach
          ausdrücklicher Bestätigung wiederherstellen, sofern der Speicher
          verfügbar ist.
        </p>
      )}
      <button
        className="button primary"
        disabled={blocked}
        onClick={exportFile}
      >
        Sicherung erstellen
      </button>
      {download && (
        <p>
          <a
            className="button secondary"
            href={download.url}
            download={download.name}
          >
            Sicherungsdatei herunterladen
          </a>
        </p>
      )}
      <label className="backup-file">
        Sicherungsdatei auswählen (JSON, höchstens 5 MiB)
        <input
          type="file"
          accept=".json,application/json"
          disabled={importBlocked}
          onChange={async (event) => {
            const id = ++request.current;
            const file = event.target.files?.[0];
            setPreview(null);
            setConfirmed(false);
            setMessage("");
            if (!file) return;
            try {
              if (file.size > MAX_BACKUP_BYTES)
                throw new Error("Die Sicherung ist größer als 5 MiB.");
              const parsed = parseBackup(await file.text());
              if (id !== request.current) return;
              setPreview(parsed);
              setFailed(false);
            } catch (error) {
              if (id === request.current) report(error);
            }
          }}
        />
      </label>
      {preview && (
        <div className="backup-preview">
          <h3>Vorschau – noch nichts geändert</h3>
          <p>
            Erstellt am {new Date(preview.exportedAt).toLocaleString("de-DE")} ·
            App {preview.appVersion} · Sicherungsformat {preview.schemaVersion}
          </p>
          <ul>
            <li>
              {Object.keys(preview.data.academy.read).length} Module mit
              Lesestand
            </li>
            <li>
              {Object.keys(preview.data.academy.answers).length} Modulantworten,{" "}
              {Object.keys(preview.data.academy.exerciseAnswers).length}{" "}
              Rechenantworten
            </li>
            <li>
              {Object.keys(preview.data.academy.reviews).length} Kartenstände,{" "}
              {preview.data.academy.examHistory.length} Prüfungsergebnisse mit
              Fehleranalyse
            </li>
            <li>
              {preview.data.legacy.attempts} frühere Quizdurchläufe ·{" "}
              {preview.data.academy.activeExam
                ? "Laufende Prüfung enthalten; die ursprüngliche Endzeit gilt weiter."
                : "Keine laufende Prüfung"}
            </li>
          </ul>
          <p>
            <strong>
              Achtung: Der aktuelle Lernstand wird vollständig ersetzt, nicht
              zusammengeführt.
            </strong>{" "}
            Sichere ihn zuerst. Schließe weitere Tabs dieser App vor dem Import.
          </p>
          <label className="backup-confirm">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />{" "}
            Ich möchte die vorhandenen Lerndaten durch diese Sicherung ersetzen.
          </label>
          <button
            className="button danger"
            disabled={!confirmed || importBlocked}
            onClick={() => {
              try {
                restoreBackup(preview, localStorage);
                onRestored();
              } catch (error) {
                report(error);
              }
            }}
          >
            Bestätigte Sicherung wiederherstellen
          </button>
        </div>
      )}
      {message && <p role={failed ? "alert" : "status"}>{message}</p>}
      <p className="field-hint">
        Lesestände, Antworten, Kartentermine, Statistiken, Prüfungs-Snapshots
        und Altbestände sind enthalten. Empfehlungen werden daraus neu
        berechnet. Sprachpräferenz sowie vorhandene Werkstatt- und Laborentwürfe
        sind ebenfalls enthalten. Kein Konto und keine automatische
        Gerätesynchronisation.
      </p>
    </section>
  );
}
