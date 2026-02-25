import type { Task } from "../types";


// Filter tasks based on search + filters
export function filterTasks(
  tasks: Task[],
  search: string,
  filters?: {
    status?: Task["status"];
    priority?: Task["priority"];
  }
) {
  return tasks.filter((t) => {

    const searchOk = t.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const statusOk = filters?.status
      ? t.status === filters.status
      : true;

    const priorityOk = filters?.priority
      ? t.priority === filters.priority
      : true;

    return searchOk && statusOk && priorityOk;
  });
}


// Sort tasks
export function sortTasks(tasks: Task[], sort: string) {

  const copy = [...tasks];

  return copy.sort((a, b) => {

    if (sort === "priority") {
      const order = { low: 1, medium: 2, high: 3 };
      return order[b.priority] - order[a.priority];
    }

    return (
      new Date(a.dueDate).getTime() -
      new Date(b.dueDate).getTime()
    );
  });
}


// Format date
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}