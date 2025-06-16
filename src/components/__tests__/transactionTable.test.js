import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TransactionTable from "../transactionTable";
import "@testing-library/jest-dom";
import { mockTransactions } from "../../__tests__/app.test";

jest.mock("../../utils/dateUtils", () => ({
  formatDate: (date) => `formatted-${date}`,
}));

describe("TransactionTable", () => {
  it("shows loading message when loading is true", () => {
    render(<TransactionTable transactions={[]} loading={true} />);
    expect(screen.getByText(/loading transactions/i)).toBeInTheDocument();
  });

  it("shows no transactions message when transactions is empty", () => {
    render(<TransactionTable transactions={[]} loading={false} />);
    expect(screen.getByText(/no transactions found/i)).toBeInTheDocument();
  });

  it("renders table headers and first page of transactions", () => {
    render(
      <TransactionTable transactions={mockTransactions} loading={false} />
    );
    expect(screen.getByText(/transaction id/i)).toBeInTheDocument();
    expect(screen.getByText(/date/i)).toBeInTheDocument();
    expect(screen.getByText(/amount/i)).toBeInTheDocument();
    expect(screen.getByText(/reward points/i)).toBeInTheDocument();
    expect(screen.getByText("t1")).toBeInTheDocument();
    expect(screen.getByText("t2")).toBeInTheDocument();
    expect(screen.getByText("t3")).toBeInTheDocument();
    expect(screen.getByText("t4")).toBeInTheDocument();
    expect(screen.queryByText("t5")).not.toBeInTheDocument();
  });

  it("renders next page when Next is clicked", () => {
    render(
      <TransactionTable transactions={mockTransactions} loading={false} />
    );
    const nextButton = screen.getByText(/next/i);
    fireEvent.click(nextButton);
    expect(screen.getByText("t5")).toBeInTheDocument();
    expect(screen.queryByText("t1")).not.toBeInTheDocument();
  });

  it("disables Prev button on first page and Next button on last page", () => {
    render(
      <TransactionTable transactions={mockTransactions} loading={false} />
    );
    const prevButton = screen.getByText(/prev/i);
    const nextButton = screen.getByText(/next/i);

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);
    expect(nextButton).toBeDisabled();
    expect(prevButton).not.toBeDisabled();
  });

  it("calculates and displays correct reward points", () => {
    render(
      <TransactionTable transactions={[mockTransactions[0]]} loading={false} />
    );
    expect(screen.getByText("90")).toBeInTheDocument();
  });

  it("formats the date using formatDate util", () => {
    render(
      <TransactionTable transactions={[mockTransactions[0]]} loading={false} />
    );
    expect(screen.getByText("formatted-2025-05-01")).toBeInTheDocument();
  });
});
