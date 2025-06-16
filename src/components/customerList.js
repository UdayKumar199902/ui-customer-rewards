import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CustomerList = ({ customers, selectedCustomerId, onSelectCustomer }) => {
  return (
    <ListContainer>
      <Title>Customers</Title>
      {customers.map((customer) => (
        <CustomerItem
          key={customer}
          active={selectedCustomerId === customer}
          onClick={() => onSelectCustomer(customer)}
        >
          {customer}
        </CustomerItem>
      ))}
    </ListContainer>
  );
};

CustomerList.propTypes = {
  customers: PropTypes.array.isRequired,
  selectedCustomerId: PropTypes.string,
  onSelectCustomer: PropTypes.func.isRequired,
};

export default CustomerList;

const ListContainer = styled.div`
  margin: 1rem 0;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const CustomerItem = styled.div`
  padding: 0.75rem 1rem;
  margin: 0.5rem;
  background-color: ${(props) => (props.active ? "#e0f7fa" : "#f9f9f9")};
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-block;

  &:hover {
    background-color: #d2eff2;
  }
`;
