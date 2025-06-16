import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "../filters";
import "@testing-library/jest-dom";

describe("Filters", () => {
  const setMonth = jest.fn();
  const setYear = jest.fn();

  beforeEach(() => {
    setMonth.mockClear();
    setYear.mockClear();
  });

  it("renders month and year labels", () => {
    render(
      <Filters
        month='recent'
        year={2025}
        setMonth={setMonth}
        setYear={setYear}
      />
    );
    expect(screen.getByLabelText(/month/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/year/i)).toBeInTheDocument();
  });

  it("renders all month options", () => {
    render(
      <Filters
        month='recent'
        year={2025}
        setMonth={setMonth}
        setYear={setYear}
      />
    );
    expect(screen.getByText("Recent 3 Months")).toBeInTheDocument();
    expect(screen.getByText("January")).toBeInTheDocument();
    expect(screen.getByText("December")).toBeInTheDocument();
  });

  it("renders all year options", () => {
    render(
      <Filters
        month='recent'
        year={2025}
        setMonth={setMonth}
        setYear={setYear}
      />
    );
    expect(screen.getByText("2025")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
  });

  it("calls setMonth when month is changed", () => {
    render(
      <Filters
        month='recent'
        year={2025}
        setMonth={setMonth}
        setYear={setYear}
      />
    );
    fireEvent.change(screen.getByLabelText(/month/i), {
      target: { value: "2" },
    });
    expect(setMonth).toHaveBeenCalledWith("2");
  });

  it("calls setYear when year is changed", () => {
    render(
      <Filters
        month='recent'
        year={2025}
        setMonth={setMonth}
        setYear={setYear}
      />
    );
    fireEvent.change(screen.getByLabelText(/year/i), {
      target: { value: "2024" },
    });
    expect(setYear).toHaveBeenCalledWith("2024");
  });

  it("shows the correct selected values", () => {
    render(
      <Filters month={5} year={2024} setMonth={setMonth} setYear={setYear} />
    );
    expect(screen.getByLabelText(/month/i).value).toBe("5");
    expect(screen.getByLabelText(/year/i).value).toBe("2024");
  });
});
