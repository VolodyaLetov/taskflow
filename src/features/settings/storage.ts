export type Theme = "dark" | "light";

const THEME_KEY = "taskflow:theme";
const PERSIST_KEY = "taskflow:persistTasks";

export function loadTheme(): Theme {
  const v = localStorage.getItem(THEME_KEY);
  return v === "light" ? "light" : "dark";
}

export function saveTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme);
}

export function loadPersistTasks(): boolean {
  const v = localStorage.getItem(PERSIST_KEY);
  // по умолчанию true
  if (v === null) return true;
  return v === "true";
}

export function savePersistTasks(value: boolean) {
  localStorage.setItem(PERSIST_KEY, String(value));
}
