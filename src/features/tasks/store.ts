import type { Task, TaskPriority, TaskStatus } from "../../types/task";

const now = () => new Date().toISOString();

export function createTask(input: {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: string;
}): Task {
  const t = now();
  return {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    description: input.description?.trim() || undefined,
    status: "todo",
    priority: input.priority,
    dueDate: input.dueDate || undefined,
    createdAt: t,
    updatedAt: t,
  };
}

export function updateTask(
  task: Task,
  patch: Partial<Pick<Task, "title" | "description" | "status" | "priority" | "dueDate">>,
): Task {
  return {
    ...task,
    ...patch,
    title: patch.title !== undefined ? patch.title.trim() : task.title,
    description:
      patch.description !== undefined ? patch.description.trim() || undefined : task.description,
    updatedAt: now(),
  };
}

export function isStatus(v: string): v is TaskStatus {
  return v === "todo" || v === "in_progress" || v === "done";
}
