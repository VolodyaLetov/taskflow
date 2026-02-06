import { useEffect, useState } from "react";
import {
  loadPersistTasks,
  loadTheme,
  savePersistTasks,
  saveTheme,
  type Theme,
} from "../features/settings/storage";

export function SettingsPage() {
  const [theme, setTheme] = useState<Theme>(() => loadTheme());
  const [persistTasks, setPersistTasks] = useState<boolean>(() =>
    loadPersistTasks(),
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    savePersistTasks(persistTasks);
  }, [persistTasks]);

  return (
    <section>
      <div className="pageHeader">
        <h1>Settings</h1>
      </div>

      <div className="settingsGrid">
        <div className="settingsCard">
          <h2 className="settingsTitle">Appearance</h2>
          <p className="muted">Choose how TaskFlow looks for you.</p>

          <div className="settingsRow">
            <div>
              <div className="settingsLabel">Theme</div>
              <div className="muted">Dark / Light</div>
            </div>

            <div className="segmented">
              <button
                className={`segBtn ${theme === "dark" ? "segBtn--active" : ""}`}
                onClick={() => setTheme("dark")}
                type="button"
              >
                Dark
              </button>
              <button
                className={`segBtn ${theme === "light" ? "segBtn--active" : ""}`}
                onClick={() => setTheme("light")}
                type="button"
              >
                Light
              </button>
            </div>
          </div>
        </div>

        <div className="settingsCard">
          <h2 className="settingsTitle">Data</h2>
          <p className="muted">Control how tasks are stored.</p>

          <div className="settingsRow">
            <div>
              <div className="settingsLabel">Persist tasks</div>
              <div className="muted">Save tasks in localStorage</div>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={persistTasks}
                onChange={(e) => setPersistTasks(e.target.checked)}
              />
              <span className="switchUi" />
            </label>
          </div>

          <p className="muted" style={{ marginTop: 10 }}>
            {persistTasks
              ? "Tasks will remain after refresh."
              : "Tasks will reset on refresh."}
          </p>
        </div>

        <div className="settingsCard">
          <h2 className="settingsTitle">About</h2>
          <div className="muted">TaskFlow • React + TypeScript • Vite</div>
          <div className="muted">Drag & drop: dnd-kit • UI: Radix Select</div>
        </div>
      </div>
    </section>
  );
}
