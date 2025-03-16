import { render, screen, act } from "@testing-library/react";
import { Alert } from "../index";

jest.useFakeTimers();

describe("Alert Component", () => {
  const mockProps = {
    message: "Test alert message",
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders alert message correctly", () => {
    render(<Alert {...mockProps} />);
    expect(screen.getByText("Test alert message")).toBeInTheDocument();
  });

  it("shows alert with 'show' class initially", () => {
    render(<Alert {...mockProps} />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("show");
  });

  it("calls onClose after 3 seconds", () => {
    render(<Alert {...mockProps} />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("cleans up timer on unmount", () => {
    const { unmount } = render(<Alert {...mockProps} />);

    unmount();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockProps.onClose).not.toHaveBeenCalled();
  });

  it("updates visibility when new message is provided", () => {
    const { rerender } = render(<Alert {...mockProps} />);

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    rerender(<Alert {...mockProps} message="New message" />);
    const alert = screen.getByRole("alert");

    expect(alert).toHaveClass("show");
  });
});
