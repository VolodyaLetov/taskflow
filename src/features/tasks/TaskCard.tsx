import type { Task, TaskStatus } from "../../types/task";

type Props = {
  task: Task;
  onPatch: (id: string, patch: Partial<Pick<Task, "status">>) => void;
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
  return (
    <div className="taskCard">
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
          aria-label="Move left"
        >
          ←
        </button>

        <button
          className="iconBtn"
          onClick={() => onPatch(task.id, { status: nextStatus(task.status) })}
          disabled={task.status === "done"}
          title="Move right"
          aria-label="Move right"
        >
          →
        </button>

        <button
          className="iconBtn danger"
          onClick={() => onRemove(task.id)}
          title="Delete"
          aria-label="Delete"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
