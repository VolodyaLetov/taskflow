import type { Task } from "../../types/task";

type Props = {
  task: Task;
};

export function TaskCard({ task }: Props) {
  return (
    <div className="taskCard">
      <div className="taskTitle">{task.title}</div>

      <div className="taskMeta">
        <span className={`pill pill--${task.priority}`}>{task.priority}</span>
        {task.dueDate && <span className="muted">due {task.dueDate}</span>}
      </div>
    </div>
  );
}
