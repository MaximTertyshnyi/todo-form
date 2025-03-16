import { render, screen } from "@testing-library/react";
import ToDoPage from "../index";

describe("ToDoPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders without crashing", () => {
    render(<ToDoPage />);
    expect(
      screen.getByPlaceholderText("What needs to be done?")
    ).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });
});
