// TaskItem displays one task and provides controls for updating it.
import type { TaskItemProps, TaskStatus } from "../../types";
import "./TaskItem.css";

export default function TaskItem({
  task,
  onStatusChange,
  onDelete,
}: TaskItemProps) {

  return (
    <li className={`taskCard ${task.status}`}>
      <div className="taskHeader">

        <div className="titleBlock">
          <h3 className="taskTitle">{task.title}</h3>
          <p className="taskDesc">{task.description}</p>
        </div>

        <div className="actions">
          <select
            className="statusSelect"
            value={task.status}
            onChange={(e) =>
              onStatusChange(task.id, e.target.value as TaskStatus)
            }
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button
            // Delete button triggers parent handler
            className="deleteBtn"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="metaRow">
        <span className={`pill ${task.priority}`}>
          Priority: {task.priority}
        </span>
        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
      </div>
    </li>
  );
}