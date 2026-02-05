import { useTasks } from "../features/tasks/useTasks";
import type { TaskStatus } from "../types/task";
import { TaskCreateForm } from "../features/tasks/TaskCreateForm";


const columns: { status: TaskStatus; title: string }[] = [
  { status: "todo", title: "Todo" },
  { status: "in_progress", title: "In Progress" },
  { status: "done", title: "Done" },
];

export function BoardPage() {
  const { tasks, actions } = useTasks();

  return (
    <section>
      <div className="pageHeader">
        <h1>Board</h1>

<TaskCreateForm
  onCreate={(input) => {
    actions.add(input);
  }}
/>

        <button className="btn" onClick={() => actions.clearAll()}>
  Clear
</button>

      </div>

      <div className="board">
        {columns.map((c) => {
          const columnTasks = tasks.filter((t) => t.status === c.status);

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
                  columnTasks.map((t) => (
                    <div key={t.id} className="taskCard">
                      <div className="taskTitle">{t.title}</div>

                      <div className="taskMeta">
                        <span className={`pill pill--${t.priority}`}>{t.priority}</span>
                        {t.dueDate && <span className="muted">due {t.dueDate}</span>}
                      </div>

                      <div className="taskActions">
                        {t.status !== "todo" && (
                          <button
                            className="iconBtn"
                            onClick={() =>
                              actions.patch(t.id, {
                                status: t.status === "done" ? "in_progress" : "todo",
                              })
                            }
                            aria-label="Move left"
                            title="Move left"
                          >
                            ←
                          </button>
                        )}

                        {t.status !== "done" && (
                          <button
                            className="iconBtn"
                            onClick={() =>
                              actions.patch(t.id, {
                                status: t.status === "todo" ? "in_progress" : "done",
                              })
                            }
                            aria-label="Move right"
                            title="Move right"
                          >
                            →
                          </button>
                        )}

                        <button
                          className="iconBtn danger"
                          onClick={() => actions.remove(t.id)}
                          aria-label="Delete"
                          title="Delete"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
