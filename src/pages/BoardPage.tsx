import type { TaskStatus } from "../types/task";

const columns: { status: TaskStatus; title: string }[] = [
  { status: "todo", title: "Todo" },
  { status: "in_progress", title: "In Progress" },
  { status: "done", title: "Done" },
];

export function BoardPage() {
  return (
    <section>
      <h1>Board</h1>

      <div className="board">
        {columns.map((c) => (
          <div key={c.status} className="column">
            <div className="columnHeader">
              <h2>{c.title}</h2>
              <span className="count">0</span>
            </div>

            <div className="columnBody">
              <p style={{ opacity: 0.7, margin: 0 }}>No tasks yet</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
