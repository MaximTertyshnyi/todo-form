import { useState, useEffect } from "react";

export const useTodoTasks = () => {
  const loadTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  };

  const [tasks, setTasks] = useState(loadTasks());

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (text.trim() === "") return false;

    if (tasks.some((task) => task.text === text.trim() && !task.completed)) {
      return false;
    }

    const newTaskObj = { id: Date.now(), text: text.trim(), completed: false };
    setTasks([...tasks, newTaskObj]);
    return true;
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTaskText = (id, newText) => {
    if (newText.trim() === "") {
      deleteTask(id);
      return;
    }

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText.trim() } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const getFilteredTasks = (filter) => {
    return tasks.filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });
  };

  const getCounts = () => ({
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  });

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    updateTaskText,
    clearCompleted,
    getFilteredTasks,
    getCounts,
  };
};
