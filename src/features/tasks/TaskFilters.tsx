import type { TaskPriority } from "../../types/task";

type Props = {
  query: string;
  priority: TaskPriority | "all";
  onChange: (next: { query: string; priority: TaskPriority | "all" }) => void;
};

export function TaskFilters({ query, priority, onChange }: Props) {
  return (
    <div className="filters">
      <label className="label">
        Search
        <input
          className="input"
          value={query}
          onChange={(e) => onChange({ query: e.target.value, priority })}
          placeholder="Search by title…"
        />
      </label>

      <label className="label">
        Priority
        <select
          className="input"
          value={priority}
          onChange={(e) => onChange({ query, priority: e.target.value as Props["priority"] })}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
    </div>
  );
}
