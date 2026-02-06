import { useState } from "react";
import type { TaskPriority } from "../../types/task";
import { PrioritySelect } from "./PrioritySelect";

type Props = {
  onCreate: (input: {
    title: string;
    priority: TaskPriority;
    dueDate?: string;
    description?: string;
  }) => void;
};

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
          <PrioritySelect
            value={priority}
            onChange={(value) => setPriority(value as TaskPriority)}
          />
        </label>

        <label className="label">
          Due date
          <input
            className="input"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        <button className="btn primary" type="submit">
          Add task
        </button>
      </div>

      {error && <p className="formError">{error}</p>}
    </form>
  );
}
