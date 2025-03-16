import { useState } from "react";
import { Check } from "lucide-react";
import { FaTrash } from "react-icons/fa";
import "./TaskList.scss";

export const TaskList = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onUpdateTaskText,
  filter,
  completedCount,
}) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  const handleUpdateTask = (id, newText) => {
    onUpdateTaskText(id, newText);
    setEditingTaskId(null);
  };

  if (filter === "completed" && completedCount === 0) {
    return <li className="TaskList__no-tasks">There's nothing here yet</li>;
  }

  if (tasks.length === 0) {
    return <li className="TaskList__no-tasks">There's nothing here yet</li>;
  }

  return (
    <ul className="TaskList">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="TaskList__item"
          data-testid={`task-${task.id}`}
        >
          <button
            onClick={() => onToggleTask(task.id)}
            className={`TaskList__checkbox ${
              task.completed ? "TaskList__checkbox--completed" : ""
            }`}
            data-testid={`toggle-${task.id}`}
          >
            {task.completed && <Check className="TaskList__check-icon" />}
          </button>

          {editingTaskId === task.id && !task.completed ? (
            <input
              type="text"
              className={`TaskList__edit-input ${
                editingTaskId === task.id ? "TaskList__edit-input--active" : ""
              }`}
              value={editedTaskText}
              onChange={(e) => setEditedTaskText(e.target.value)}
              onBlur={() => handleUpdateTask(task.id, editedTaskText)}
              autoFocus
              data-testid={`edit-input-${task.id}`}
            />
          ) : (
            <span
              className={`TaskList__text ${
                task.completed ? "TaskList__text--completed" : ""
              }`}
              onClick={() => {
                if (!task.completed) {
                  setEditingTaskId(task.id);
                  setEditedTaskText(task.text);
                }
              }}
              data-testid={`text-${task.id}`}
            >
              {task.text}
            </span>
          )}

          <button
            onClick={() => onDeleteTask(task.id)}
            className="TaskList__delete-button"
            data-testid={`delete-${task.id}`}
          >
            <FaTrash className="TaskList__trash-icon" />
          </button>
        </li>
      ))}
    </ul>
  );
};
