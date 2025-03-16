import { render, screen } from "@testing-library/react";
import { TaskInput } from "../index";

describe("TaskInput Component", () => {
  const mockOnAddTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnAddTask.mockReturnValue(true);
  });

  it("renders textarea and button", () => {
    render(<TaskInput onAddTask={mockOnAddTask} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Task" })
    ).toBeInTheDocument();
  });

  it("disables submit button when input is empty", () => {
    render(<TaskInput onAddTask={mockOnAddTask} />);
    const button = screen.getByRole("button", { name: "Add Task" });

    expect(button).toBeDisabled();
    expect(button).not.toHaveClass("active");
  });
});
