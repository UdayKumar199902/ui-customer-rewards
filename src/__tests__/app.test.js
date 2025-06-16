import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";
import api from "../api/getTransactions";

jest.mock("../api/getTransactions", () => ({
  fetchTransactions: jest.fn(),
}));

export const mockTransactions = [
  {
    transactionId: "t1",
    customerId: "CUST001",
    customerName: "Alice Johnson",
    amount: 120,
    date: "2025-05-01",
  },
  {
    transactionId: "t2",
    customerId: "CUST002",
    customerName: "Bob Smith",
    amount: 80,
    date: "2025-04-01",
  },
  {
    transactionId: "t3",
    customerId: "CUST001",
    customerName: "Alice Johnson",
    amount: 60,
    date: "2025-03-01",
  },
  {
    transactionId: "t4",
    customerId: "CUST003",
    customerName: "Charlie Brown",
    amount: 200,
    date: "2025-02-01",
  },
  {
    transactionId: "t5",
    customerId: "CUST001",
    customerName: "Alice Johnson",
    amount: 140.7,
    date: "2025-01-01",
  },
];

describe("App integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading and then renders customer list", async () => {
    const { fetchTransactions } = require("../api/getTransactions");
    fetchTransactions.mockResolvedValueOnce(mockTransactions);

    render(<App />);
    expect(screen.getByText(/loading transactions/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/customers/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("CUST001")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("CUST002")).toBeInTheDocument();
    });
  });

  it("shows error modal if fetch fails and retries on click", async () => {
    jest.spyOn(api, "fetchTransactions").mockRejectedValueOnce("Network error");

    render(<App />);
    await waitFor(() => {
      expect(
        screen.getByText(/Failed to load transactions/i)
      ).toBeInTheDocument();
    });

    jest
      .spyOn(api, "fetchTransactions")
      .mockResolvedValueOnce(mockTransactions);
    fireEvent.click(screen.getByText(/Retry/i));
    await waitFor(() => {
      expect(screen.getByText(/customers/i)).toBeInTheDocument();
    });
  });

  it("shows only customer list if no customer is selected", async () => {
    const { fetchTransactions } = require("../api/getTransactions");
    fetchTransactions.mockResolvedValueOnce(mockTransactions);

    render(<App />);
    await screen.findByText("CUST001");

    expect(screen.getByText(/customers/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/monthly rewards summary/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/transaction id/i)).not.toBeInTheDocument();
  });
});
