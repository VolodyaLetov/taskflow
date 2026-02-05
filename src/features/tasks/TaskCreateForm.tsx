import { useState } from "react";
import type { TaskPriority } from "../../types/task";

type Props = {
  onCreate: (input: { title: string; priority: TaskPriority; dueDate?: string; description?: string }) => void;
};

const priorities: { value: TaskPriority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export function TaskCreateForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  function submit(e: React.FormEvent) {
    e.preventDefault();

    const cleanTitle = title.trim();
    if (cleanTitle.length < 3) {
      setError("Title must be at least 3 characters.");
      return;
    }

    setError("");
    onCreate({
      title: cleanTitle,
      priority,
      dueDate: dueDate || undefined,
    });

    setTitle("");
    setPriority("medium");
    setDueDate("");
  }

  return (
    <form className="taskForm" onSubmit={submit}>
      <div className="taskFormRow">
        <label className="label">
          Title
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Apply to X company"
          />
        </label>

        <label className="label">
          Priority
          <select className="input" value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
            {priorities.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </label>

        <label className="label">
          Due date
          <input className="input" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>

        <button className="btn primary" type="submit">
          Add task
        </button>
      </div>

      {error && <p className="formError">{error}</p>}
    </form>
  );
}
