// TaskForm handles user input for creating a new task.
import { useState } from "react";
import type { Task } from "../../types";

type Props = {
  onAddTask: (task: Task) => void;
};

export default function TaskForm({ onAddTask }: Props) {
   // Local state for controlled form inputs
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending" as Task["status"],
    priority: "low" as Task["priority"],
    dueDate: "",
  });

  // Updates form state when user types or selects values
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Handles form submission
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Title required");
      return;
    }

    // Sends new task back to Dashboard
    onAddTask({
      ...form,
      id: crypto.randomUUID(),
    });

    // Reset form after submission
    setForm({
      title: "",
      description: "",
      status: "pending",
      priority: "low",
      dueDate: "",
    });
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}
