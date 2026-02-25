// TaskList prepares the tasks before rendering.
import type { Task, TaskStatus, TaskFilterProps } from "../../types";
import TaskItem from "../TaskItem/TaskItem";
import TaskFilter from "../TaskFilter/TaskFilter";
import { useState } from "react";
import "./TaskList.css";
import { filterTasks } from "../../utils/taskUtils";

type Props = {
  tasks: Task[];
  filters?: {
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  };
  onFilterChange: TaskFilterProps["onFilterChange"];
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({
  tasks,
  filters,
  onFilterChange,
  onStatusChange,
  onDelete,
}: Props) {
  // Local search state
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");

  // Filters tasks based on search text, status, and priority
  const filtered = filterTasks(tasks, search, filters);

  return (
    <div className="container">
      <div className="controls">
        <TaskFilter onFilterChange={onFilterChange} />

        <input
          className="search"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      <ul className="list">
        {/* Creates a copy of filtered array  */}
        {[...filtered]
          // Sorts based on selected option
          .sort((a, b) => {
            if (sort === "priority") {
              const order = { low: 1, medium: 2, high: 3 };
              return order[b.priority] - order[a.priority];
            }
            return (
              // Default sorting by due date
              new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            );
          })
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
      </ul>
    </div>
  );
}
