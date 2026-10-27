import { useEffect, useState } from "react";
import { ACADEMY_KEY, emptyAcademy, readAcademy } from "./progress";

export function useAcademyProgress() {
  const [initial] = useState(readAcademy);
  const [progress, setProgress] = useState(initial.progress);
  const [error, setError] = useState<string | null>(initial.message);
  useEffect(() => {
    if (initial.blocked) return;
    try {
      localStorage.setItem(ACADEMY_KEY, JSON.stringify(progress));
      setError(null);
    } catch {
      setError(
        "Akademie-Fortschritt konnte nicht gespeichert werden. Änderungen bleiben nur in dieser Sitzung. Bitte prüfe die Browserspeicherung.",
      );
    }
  }, [progress, initial.blocked]);
  // Bei unsicher gelesenen Daten keine destruktive Rücksetzung auslösen.
  function reset() {
    if (initial.blocked) return;
    setProgress(emptyAcademy());
  }
  return { progress, setProgress, error, reset, blocked: initial.blocked };
}
