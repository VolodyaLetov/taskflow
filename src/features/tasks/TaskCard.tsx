import { useState } from "react";
import type { Task, TaskPriority, TaskStatus } from "../../types/task";

type Patch = Partial<Pick<Task, "status" | "title" | "priority">>;

type Props = {
  task: Task;
  onPatch: (id: string, patch: Patch) => void;
  onRemove: (id: string) => void;
};

function prevStatus(s: TaskStatus): TaskStatus {
  if (s === "done") return "in_progress";
  if (s === "in_progress") return "todo";
  return "todo";
}

function nextStatus(s: TaskStatus): TaskStatus {
  if (s === "todo") return "in_progress";
  if (s === "in_progress") return "done";
  return "done";
}

export function TaskCard({ task, onPatch, onRemove }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [error, setError] = useState("");

  function startEdit() {
    setIsEditing(true);
    setTitle(task.title);
    setPriority(task.priority);
    setError("");
  }

  function cancelEdit() {
    setIsEditing(false);
    setTitle(task.title);
    setPriority(task.priority);
    setError("");
  }

  function save() {
    const clean = title.trim();
    if (clean.length < 3) {
      setError("Title must be at least 3 characters.");
      return;
    }
    onPatch(task.id, { title: clean, priority });
    setIsEditing(false);
  }

  return (
    <div className="taskCard">
      {!isEditing ? (
        <>
          <div className="taskTitle">{task.title}</div>

          <div className="taskMeta">
            <span className={`pill pill--${task.priority}`}>{task.priority}</span>
            {task.dueDate && <span className="muted">due {task.dueDate}</span>}
          </div>

          <div className="taskActions">
            <button
              className="iconBtn"
              onClick={() => onPatch(task.id, { status: prevStatus(task.status) })}
              disabled={task.status === "todo"}
              title="Move left"
            >
              ←
            </button>

            <button
              className="iconBtn"
              onClick={() => onPatch(task.id, { status: nextStatus(task.status) })}
              disabled={task.status === "done"}
              title="Move right"
            >
              →
            </button>

            <button className="iconBtn" onClick={startEdit} title="Edit">
              ✎
            </button>

            <button className="iconBtn danger" onClick={() => onRemove(task.id)} title="Delete">
              ✕
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="editGrid">
            <label className="label">
              Title
              <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>

            <label className="label">
              Priority
              <select
                className="input"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>

            <div className="editButtons">
              <button className="btn primary" onClick={save} type="button">
                Save
              </button>
              <button className="btn" onClick={cancelEdit} type="button">
                Cancel
              </button>
            </div>
          </div>

          {error && <p className="formError">{error}</p>}
        </>
      )}
    </div>
  );
}
