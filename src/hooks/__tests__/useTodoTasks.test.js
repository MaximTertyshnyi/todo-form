import { renderHook, act } from "@testing-library/react";
import { useTodoTasks } from "../useTodoTasks";

describe("useTodoTasks Hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("loads tasks from localStorage", () => {
    const savedTasks = [{ id: 1, text: "Test Task", completed: false }];
    localStorage.setItem("tasks", JSON.stringify(savedTasks));

    const { result } = renderHook(() => useTodoTasks());

    expect(result.current.tasks).toEqual(savedTasks);
  });

  it("adds new task successfully", () => {
    const { result } = renderHook(() => useTodoTasks());

    act(() => {
      const success = result.current.addTask("New Task");
      expect(success).toBe(true);
    });

    const newTask = result.current.tasks.find(
      (task) => task.text === "New Task"
    );
    expect(newTask).toBeDefined();
    expect(newTask.completed).toBe(false);
  });

  it("prevents adding duplicate active task", () => {
    const { result } = renderHook(() => useTodoTasks());

    act(() => {
      result.current.addTask("New Task");
    });

    let success;
    act(() => {
      success = result.current.addTask("New Task");
    });

    expect(success).toBe(false);
    const newTasks = result.current.tasks.filter(
      (task) => task.text === "New Task"
    );
    expect(newTasks).toHaveLength(1);
  });

  it("allows adding same task if previous one is completed", () => {
    const { result } = renderHook(() => useTodoTasks());

    act(() => {
      result.current.addTask("New Task");
    });

    const taskId = result.current.tasks.find(
      (task) => task.text === "New Task"
    )?.id;
    expect(taskId).toBeDefined();

    act(() => {
      result.current.toggleTask(taskId);
    });

    let success;
    act(() => {
      success = result.current.addTask("New Task");
    });

    expect(success).toBe(true);
    const newTasks = result.current.tasks.filter(
      (task) => task.text === "New Task"
    );
    expect(newTasks).toHaveLength(2);
  });

  it("toggles task completion", () => {
    const { result } = renderHook(() => useTodoTasks());

    act(() => {
      result.current.addTask("Test Task");
    });

    const taskId = result.current.tasks.find(
      (task) => task.text === "Test Task"
    )?.id;
    expect(taskId).toBeDefined();

    act(() => {
      result.current.toggleTask(taskId);
    });

    const toggledTask = result.current.tasks.find(
      (task) => task.text === "Test Task"
    );
    expect(toggledTask.completed).toBe(true);
  });

  it("updates task text", () => {
    const { result } = renderHook(() => useTodoTasks());

    act(() => {
      result.current.addTask("Original Task");
    });

    const taskId = result.current.tasks.find(
      (task) => task.text === "Original Task"
    )?.id;
    expect(taskId).toBeDefined();

    act(() => {
      result.current.updateTaskText(taskId, "Updated Task");
    });

    const updatedTask = result.current.tasks.find(
      (task) => task.text === "Updated Task"
    );
    expect(updatedTask).toBeDefined();
  });

  it("deletes task when update text is empty", () => {
    const { result } = renderHook(() => useTodoTasks());

    act(() => {
      result.current.addTask("Test Task");
    });

    const taskId = result.current.tasks.find(
      (task) => task.text === "Test Task"
    )?.id;
    expect(taskId).toBeDefined();

    act(() => {
      result.current.updateTaskText(taskId, "");
    });

    const deletedTask = result.current.tasks.find(
      (task) => task.text === "Test Task"
    );
    expect(deletedTask).toBeUndefined();
  });

  it("deletes task", () => {
    const { result } = renderHook(() => useTodoTasks());

    act(() => {
      result.current.addTask("Test Task");
    });

    const taskId = result.current.tasks.find(
      (task) => task.text === "Test Task"
    )?.id;
    expect(taskId).toBeDefined();

    act(() => {
      result.current.deleteTask(taskId);
    });

    const deletedTask = result.current.tasks.find(
      (task) => task.text === "Test Task"
    );
    expect(deletedTask).toBeUndefined();
  });
});
