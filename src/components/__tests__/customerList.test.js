import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import CustomerList from "../customerList";
describe("CustomerList", () => {
  const customers = ["CUST001", "CUST002", "CUST003"];
  const mockSelect = jest.fn();

  beforeEach(() => {
    mockSelect.mockClear();
  });

  it("renders the customer title and all customer items", () => {
    render(
      <CustomerList
        customers={customers}
        selectedCustomerId={null}
        onSelectCustomer={mockSelect}
      />
    );

    expect(screen.getByText("Customers")).toBeInTheDocument();

    customers.forEach((custId) => {
      expect(screen.getByText(custId)).toBeInTheDocument();
    });
  });

  it("calls onSelectCustomer when a customer is clicked", () => {
    render(
      <CustomerList
        customers={customers}
        selectedCustomerId={null}
        onSelectCustomer={mockSelect}
      />
    );

    fireEvent.click(screen.getByText("CUST002"));

    expect(mockSelect).toHaveBeenCalledTimes(1);
    expect(mockSelect).toHaveBeenCalledWith("CUST002");
  });

  it("highlights the selected customer with active style", () => {
    render(
      <CustomerList
        customers={customers}
        selectedCustomerId='CUST003'
        onSelectCustomer={mockSelect}
      />
    );

    const activeItem = screen.getByText("CUST003");
    expect(activeItem).toHaveStyle("background-color: #e0f7fa");
  });

  it("does not highlight any customer if selectedCustomerId is null", () => {
    render(
      <CustomerList
        customers={customers}
        selectedCustomerId={null}
        onSelectCustomer={mockSelect}
      />
    );

    customers.forEach((custId) => {
      const item = screen.getByText(custId);
      expect(item).not.toHaveStyle("background-color: #e0f7fa");
    });
  });

  it("renders empty state if customers array is empty", () => {
    render(
      <CustomerList
        customers={[]}
        selectedCustomerId={null}
        onSelectCustomer={mockSelect}
      />
    );

    expect(screen.getByText("Customers")).toBeInTheDocument();
    expect(screen.queryByText("CUST001")).not.toBeInTheDocument();
    expect(screen.queryByText("CUST002")).not.toBeInTheDocument();
  });

  it("does not call onSelectCustomer when clicking the already selected customer", () => {
    render(
      <CustomerList
        customers={customers}
        selectedCustomerId='CUST001'
        onSelectCustomer={mockSelect}
      />
    );

    fireEvent.click(screen.getByText("CUST001"));
    expect(mockSelect).toHaveBeenCalledWith("CUST001");
  });

  it("renders correctly with only one customer", () => {
    render(
      <CustomerList
        customers={["CUST_SINGLE"]}
        selectedCustomerId={null}
        onSelectCustomer={mockSelect}
      />
    );

    expect(screen.getByText("CUST_SINGLE")).toBeInTheDocument();
  });
});
