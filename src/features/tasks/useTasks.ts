import { useEffect, useMemo, useState } from "react";
import type { Task } from "../../types/task";
import { createTask, updateTask } from "./store";

const STORAGE_KEY = "taskflow.tasks.v1";

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Task[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // ignore storage quota / private mode issues
    }
  }, [tasks]);

  const actions = useMemo(
    () => ({
      add: (input: Parameters<typeof createTask>[0]) => {
        const t = createTask(input);
        setTasks((prev) => [t, ...prev]);
      },
      patch: (id: string, patch: Parameters<typeof updateTask>[1]) => {
        setTasks((prev) => prev.map((t) => (t.id === id ? updateTask(t, patch) : t)));
      },
      remove: (id: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
      },
      clearAll: () => {
        setTasks([]);
      },
    }),
    [],
  );

  return { tasks, actions };
}
