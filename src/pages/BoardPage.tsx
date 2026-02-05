import { useTasks } from "../features/tasks/useTasks";
import type { TaskStatus } from "../types/task";
import { TaskCreateForm } from "../features/tasks/TaskCreateForm";
import { useMemo, useState } from "react";
import type { TaskPriority } from "../types/task";
import { TaskFilters } from "../features/tasks/TaskFilters";
import { TaskCard } from "../features/tasks/TaskCard";



const columns: { status: TaskStatus; title: string }[] = [
  { status: "todo", title: "Todo" },
  { status: "in_progress", title: "In Progress" },
  { status: "done", title: "Done" },
];

export function BoardPage() {
  const { tasks, actions } = useTasks();

  const [query, setQuery] = useState("");
  const [priority, setPriority] =
    useState<TaskPriority | "all">("all");

  const visibleTasks = useMemo(() => {
    const q = query.trim().toLowerCase();

    return tasks.filter((t) => {
      const matchQuery =
        q === "" || t.title.toLowerCase().includes(q);

      const matchPriority =
        priority === "all" || t.priority === priority;

      return matchQuery && matchPriority;
    });
  }, [tasks, query, priority]);
  return (
    <section>
      <div className="pageHeader">
        <h1>Board</h1>

<TaskCreateForm
  onCreate={(input) => {
    actions.add(input);
  }}
/>
<TaskFilters
  query={query}
  priority={priority}
  onChange={(next) => {
    setQuery(next.query);
    setPriority(next.priority);
  }}
/>


        <button className="btn" onClick={() => actions.clearAll()}>
  Clear
</button>

      </div>

      <div className="board">
        {columns.map((c) => {
          const columnTasks = visibleTasks.filter((t) => t.status === c.status);

          return (
            <div key={c.status} className="column">
              <div className="columnHeader">
                <h2>{c.title}</h2>
                <span className="count">{columnTasks.length}</span>
              </div>

              <div className="columnBody">
  {columnTasks.length === 0 ? (
    <p className="muted">No tasks yet</p>
  ) : (
    columnTasks.map((t) => <TaskCard key={t.id} task={t} />)
  )}
</div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
