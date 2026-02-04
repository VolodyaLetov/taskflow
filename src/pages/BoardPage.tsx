export function BoardPage() { return ( <section>
   <h1>Board</h1> 
   <p>Tasks will appear here.</p> 
   </section> ); }

import type { TaskStatus } from "../types/task";
const columns: { status: TaskStatus; title: string }[] = [
  { status: "todo", title: "Todo" },
  { status: "in_progress", title: "In Progress" },
  { status: "done", title: "Done" },
];
