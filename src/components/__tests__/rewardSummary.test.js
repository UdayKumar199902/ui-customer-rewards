import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RewardsSummary from "../rewardsSummary";
import { mockTransactions } from "../../__tests__/app.test";

describe("RewardsSummary", () => {
  test("displays correct table headers and total points", async () => {
    render(<RewardsSummary transactions={mockTransactions} />);
    expect(screen.getByText("Month")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Points")).toBeInTheDocument();
    expect(screen.getByText(/Total/i)).toBeInTheDocument();
    const pointsElements = await screen.findAllByText("511.4");
    expect(pointsElements[0]).toBeInTheDocument();
  });

  test("renders no data message when transactions are empty", () => {
    render(<RewardsSummary transactions={[]} />);
    expect(screen.getByText(/no reward data/i)).toBeInTheDocument();
  });

  test("calculates points correctly for given amounts", async () => {
    render(<RewardsSummary transactions={[mockTransactions[0]]} />);
    expect(screen.getByText("May")).toBeInTheDocument();
    expect(screen.getByText("2025")).toBeInTheDocument();
    const pointsElements = await screen.findAllByText("90");
    expect(pointsElements[0]).toBeInTheDocument();
  });
  test("calculates points correctly for given fraction amounts", async () => {
    render(<RewardsSummary transactions={[mockTransactions[4]]} />);
    expect(screen.getByText("January")).toBeInTheDocument();
    expect(screen.getByText("2025")).toBeInTheDocument();
    const pointsElements = await screen.findAllByText("131.4");
    expect(pointsElements[0]).toBeInTheDocument();
  });
});
