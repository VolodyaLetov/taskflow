import { useMemo, useState } from "react";
import type { Task } from "../../types/task";
import { createTask, updateTask } from "./store";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

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
    }),
    [],
  );

  return { tasks, actions };
}
