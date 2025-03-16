import { useState } from "react";
import "./ToDoPage.scss";
import { Alert } from "../../components/Alert";
import { TaskInput } from "../../components/TaskInput";
import { TaskList } from "../../components/TaskList";
import { useTodoTasks } from "../../hooks/useTodoTasks";

export default function ToDoPage() {
  const {
    addTask,
    deleteTask,
    toggleTask,
    updateTaskText,
    clearCompleted,
    getFilteredTasks,
    getCounts,
  } = useTodoTasks();

  const [filter, setFilter] = useState("all");
  const [showAlert, setShowAlert] = useState(false);

  const handleAddTask = (text) => {
    const success = addTask(text);
    if (!success) {
      setShowAlert(true);
    }
    return success;
  };

  const { active: activeTasksCount, completed: completedTasksCount } =
    getCounts();
  const filteredTasks = getFilteredTasks(filter);

  return (
    <div className="ToDoPage">
      <div className="ToDoPage__container">
        <h1 className="ToDoPage__title">todos</h1>
        <div className="ToDoPage__card">
          <div className="ToDoPage__card-shadow"></div>
          {filter !== "completed" ? (
            <TaskInput onAddTask={handleAddTask} />
          ) : (
            <div className="ToDoPage__card_input-completed">
              rest in history
            </div>
          )}

          <TaskList
            tasks={filteredTasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onUpdateTaskText={updateTaskText}
            filter={filter}
            completedCount={completedTasksCount}
          />

          <div className="ToDoPage__footer">
            {filter !== "completed" && (
              <span className="ToDoPage__count">
                {activeTasksCount} items left
              </span>
            )}
            {filter === "completed" && (
              <span className="ToDoPage__count">
                {completedTasksCount} items completed
              </span>
            )}
            <div className="ToDoPage__filters">
              <button
                onClick={() => setFilter("all")}
                className={`ToDoPage__filter ${
                  filter === "all" ? "ToDoPage__filter--active" : ""
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`ToDoPage__filter ${
                  filter === "active" ? "ToDoPage__filter--active" : ""
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`ToDoPage__filter ${
                  filter === "completed" ? "ToDoPage__filter--active" : ""
                }`}
              >
                Completed
              </button>
            </div>
            <button onClick={clearCompleted} className="ToDoPage__clear">
              Clear completed
            </button>
          </div>
        </div>
      </div>
      {showAlert && (
        <Alert
          message="This task is already in progress."
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}
