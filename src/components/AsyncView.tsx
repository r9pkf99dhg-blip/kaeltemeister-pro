import { Component, Suspense, type ReactNode } from "react";
export default class AsyncView extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <section role="alert" className="notice">
        <p>
          Diese Ansicht konnte nicht geladen werden. Deine gespeicherten
          Lerndaten bleiben erhalten. Lade die Seite neu oder wähle einen
          anderen Bereich.
        </p>
        <button
          className="button secondary"
          onClick={() => window.location.reload()}
        >
          Ansicht neu laden
        </button>
      </section>
    ) : (
      <Suspense fallback={<p role="status">Ansicht wird geladen …</p>}>
        {this.props.children}
      </Suspense>
    );
  }
}
