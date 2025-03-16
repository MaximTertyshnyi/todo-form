import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskList } from "../index";

describe("TaskList Component", () => {
  const mockTasks = [
    { id: 1, text: "Task 1", completed: false },
    { id: 2, text: "Task 2", completed: true },
  ];

  const mockProps = {
    tasks: mockTasks,
    onToggleTask: jest.fn(),
    onDeleteTask: jest.fn(),
    onUpdateTaskText: jest.fn(),
    filter: "all",
    completedCount: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders tasks correctly", () => {
    render(<TaskList {...mockProps} />);

    expect(screen.getByTestId("text-1")).toHaveTextContent("Task 1");
    expect(screen.getByTestId("text-2")).toHaveTextContent("Task 2");
  });

  it('shows "no tasks" message when list is empty', () => {
    render(<TaskList {...mockProps} tasks={[]} />);

    expect(screen.getByText("There's nothing here yet")).toBeInTheDocument();
  });

  it('shows "no tasks" message for completed filter with no completed tasks', () => {
    render(<TaskList {...mockProps} filter="completed" completedCount={0} />);

    expect(screen.getByText("There's nothing here yet")).toBeInTheDocument();
  });

  it("calls onToggleTask when checkbox is clicked", async () => {
    render(<TaskList {...mockProps} />);

    const toggleButton = screen.getByTestId("toggle-1");
    await userEvent.click(toggleButton);

    expect(mockProps.onToggleTask).toHaveBeenCalledWith(1);
  });

  it("calls onDeleteTask when delete button is clicked", async () => {
    render(<TaskList {...mockProps} />);

    const deleteButton = screen.getByTestId("delete-1");
    await userEvent.click(deleteButton);

    expect(mockProps.onDeleteTask).toHaveBeenCalledWith(1);
  });

  it("applies completed styles to completed tasks", () => {
    render(<TaskList {...mockProps} />);

    const completedTask = screen.getByTestId("text-2");
    expect(completedTask).toHaveClass("TaskList__text--completed");
  });
});
