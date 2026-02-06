import type { TaskPriority } from "../../types/task";
import { PrioritySelect } from "./PrioritySelect";

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
        <PrioritySelect
          value={priority}
          onChange={(value) => onChange({ query, priority: value })}
        />
      </label>
    </div>
  );
}
