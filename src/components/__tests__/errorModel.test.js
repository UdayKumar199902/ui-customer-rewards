import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorModal from "../errorModal";
import "@testing-library/jest-dom";

describe("ErrorModal", () => {
  it("renders the provided error message", () => {
    render(<ErrorModal message='Test error!' onRetry={jest.fn()} />);
    expect(screen.getByText("Test error!")).toBeInTheDocument();
  });

  it("renders the default message if no message is provided", () => {
    render(<ErrorModal onRetry={jest.fn()} />);
    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  it("calls onRetry when Retry button is clicked", () => {
    const onRetry = jest.fn();
    render(<ErrorModal message='Error' onRetry={onRetry} />);
    fireEvent.click(screen.getByText(/retry/i));
    expect(onRetry).toHaveBeenCalled();
  });

  it("renders the Retry button", () => {
    render(<ErrorModal message='Error' onRetry={jest.fn()} />);
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });
});
