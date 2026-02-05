import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../../types/task";
import { TaskCard } from "./TaskCard";

type Patch = Partial<Pick<Task, "status" | "title" | "priority">>;

type Props = {
  task: Task;
  onPatch: (id: string, patch: Patch) => void;
  onRemove: (id: string) => void;
};

export function SortableTaskCard({ task, onPatch, onRemove }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { taskId: task.id },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="taskWrapper">
      <div className="dragHandle" {...attributes} {...listeners}>
        ≡
      </div>

      <TaskCard task={task} onPatch={onPatch} onRemove={onRemove} />
    </div>
  );
}
