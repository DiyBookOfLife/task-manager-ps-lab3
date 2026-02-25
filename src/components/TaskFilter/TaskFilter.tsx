// TaskFilter allows user to filter tasks by status
import type { TaskFilterProps } from "../../types";
import React from "react";

export default function TaskFilter({ onFilterChange }: TaskFilterProps) {
  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    // If empty value selected, remove filter
    onFilterChange({
      status: e.target.value === "" ? undefined : (e.target.value as any),
    });
  }

  return (
    <select onChange={handleStatusChange}>
      <option value="">All</option>
      <option value="pending">Pending</option>
      <option value="in-progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  );
}
