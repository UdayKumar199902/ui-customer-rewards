import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { formatDate } from "../utils/dateUtils";
import { calculatePoints } from "./rewardsSummary";

const TransactionTable = ({ transactions, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const currentData = transactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (loading) {
    return <Message>Loading transactions...</Message>;
  }

  if (!transactions.length) {
    return <Message>No transactions found for this filter.</Message>;
  }

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <Th>Transaction ID</Th>
            <Th>Date</Th>
            <Th>Amount ($)</Th>
            <Th>Reward Points</Th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((txn) => (
            <tr key={txn.transactionId}>
              <Td>{txn.transactionId}</Td>
              <Td>{formatDate(txn.date)}</Td>
              <Td>{txn.amount.toFixed(2)}</Td>
              <Td>{calculatePoints(txn.amount)}</Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <PaginationWrapper>
        <Button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </PaginationWrapper>
    </TableWrapper>
  );
};

TransactionTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default TransactionTable;

const TableWrapper = styled.div`
  margin-top: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
`;

const Th = styled.th`
  background-color: #f4f4f4;
  padding: 0.75rem;
  text-align: left;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 0.75rem;
  border: 1px solid #ddd;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.4rem 0.8rem;
  margin-left: 0.5rem;
  border: none;
  background-color: #0078d4;
  color: white;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  font-style: italic;
  color: gray;
`;

// const calculatePoints = (amount) => {
//   let points = 0;
//   if (amount > 100) {
//     points += (amount - 100) * 2 + 50;
//   } else if (amount > 50) {
//     points += amount - 50;
//   }
//   return Math.floor(points);
// };
