// Dashboard is the main controller
import { useState, useEffect } from "react";
import type { Task, TaskStatus } from "../../types";
import TaskList from "../Tasklist/TaskList";
import TaskForm from "../TaskForm/TaskForm";
import "./Dashboard.css";

type Filters = {
  status?: TaskStatus;
  priority?: "low" | "medium" | "high";
};

export default function Dashboard() {
  // Stores all tasks.
  const [tasks, setTasks] = useState<Task[]>([]);
  // Stores current filter selections (status / priority)
  const [filters, setFilters] = useState<Filters>({});

  // Adds a new task coming from TaskForm
  function handleAddTask(newTask: Task) {
    setTasks((prev) => [...prev, newTask]);
  }

  // Updates the status of a specific task
  function handleStatusChange(id: string, newStatus: TaskStatus) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)),
    );
  }

  // Removes a task from the list
  function handleDelete(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Load tasks when component mounts
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <div className="page">
      <h1 className="title">Daily Task Dashboard</h1>
      <div className="formRow">
        <TaskForm onAddTask={handleAddTask} />
      </div>

      <TaskList
        tasks={tasks}
        filters={filters}
        onFilterChange={setFilters}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}
