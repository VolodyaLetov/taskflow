import { useTasks } from "../features/tasks/useTasks";
import { TaskCreateForm } from "../features/tasks/TaskCreateForm";
import { TaskFilters } from "../features/tasks/TaskFilters";
import { SortableTaskCard } from "../features/tasks/SortableTaskCard";
import { useMemo, useState } from "react";
import { DndContext, DragOverlay, useDroppable } from "@dnd-kit/core";
import { TaskCard } from "../features/tasks/TaskCard";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Task, TaskPriority, TaskStatus } from "../types/task";

const columns: { status: TaskStatus; title: string }[] = [
  { status: "todo", title: "Todo" },
  { status: "in_progress", title: "In Progress" },
  { status: "done", title: "Done" },
];

function BoardColumn({
  status,
  title,
  tasks,
  onPatch,
  onRemove,
}: {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onPatch: (
    id: string,
    patch: Partial<Pick<Task, "status" | "title" | "priority">>,
  ) => void;
  onRemove: (id: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div ref={setNodeRef} className={`column ${isOver ? "column--over" : ""}`}>
      <div className="columnHeader">
        <h2>{title}</h2>
        <span className="count">{tasks.length}</span>
      </div>

      <div className="columnBody">
        {tasks.length === 0 ? (
          <p className="muted">No tasks yet</p>
        ) : (
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((t) => (
              <SortableTaskCard
                key={t.id}
                task={t}
                onPatch={onPatch}
                onRemove={onRemove}
              />
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  );
}

export function BoardPage() {
  const { tasks, actions } = useTasks();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState<TaskPriority | "all">("all");

  const visibleTasks = useMemo(() => {
    const q = query.trim().toLowerCase();

    return tasks.filter((t) => {
      const matchQuery = q === "" || t.title.toLowerCase().includes(q);
      const matchPriority = priority === "all" || t.priority === priority;
      return matchQuery && matchPriority;
    });
  }, [tasks, query, priority]);

  const activeTask = useMemo(
    () => tasks.find((t) => t.id === activeId) ?? null,
    [tasks, activeId],
  );

  function handleDragStart(event: any) {
    setActiveId(String(event.active.id));
  }

  function isStatus(id: string): id is TaskStatus {
    return id === "todo" || id === "in_progress" || id === "done";
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveId(null);
    if (!over) return;

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);

    const activeTask = tasks.find((t) => t.id === activeIdStr);
    if (!activeTask) return;
    const targetStatus: TaskStatus | null = isStatus(overIdStr)
      ? overIdStr
      : (tasks.find((t) => t.id === overIdStr)?.status ?? null);

    if (!targetStatus) return;
    if (activeTask.status === targetStatus) return;

    actions.patch(activeTask.id, { status: targetStatus });
  }

  function handleDragCancel() {
    setActiveId(null);
  }
  return (
    <section>
      <div className="pageHeader">
        <h1>Board</h1>
        <button className="btn" onClick={() => actions.clearAll()}>
          Clear
        </button>
      </div>

      <TaskCreateForm onCreate={(input) => actions.add(input)} />

      <TaskFilters
        query={query}
        priority={priority}
        onChange={(next) => {
          setQuery(next.query);
          setPriority(next.priority);
        }}
      />

      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="board">
          {columns.map((c) => {
            const columnTasks = visibleTasks.filter(
              (t) => t.status === c.status,
            );

            return (
              <BoardColumn
                key={c.status}
                status={c.status}
                title={c.title}
                tasks={columnTasks}
                onPatch={(id, patch) => actions.patch(id, patch)}
                onRemove={(id) => actions.remove(id)}
              />
            );
          })}
        </div>
        <DragOverlay>
          {activeTask ? (
            <div className="dndDragging">
              <TaskCard
                task={activeTask}
                onPatch={(id, patch) => actions.patch(id, patch)}
                onRemove={(id) => actions.remove(id)}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
}
