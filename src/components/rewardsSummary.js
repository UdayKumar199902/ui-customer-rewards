import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2 + 50;
  } else if (amount > 50) {
    points += amount - 50;
  }
  return Number(points.toFixed(1));
};

const RewardsSummary = ({ transactions }) => {
  const rewardsByMonth = {};

  transactions.forEach((txn) => {
    const date = new Date(txn.date);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const points = calculatePoints(txn.amount);

    if (!rewardsByMonth[key]) {
      rewardsByMonth[key] = {
        month: date.toLocaleString("default", { month: "long" }),
        year: date.getFullYear(),
        points: 0,
      };
    }

    rewardsByMonth[key].points += points;
  });

  const sortedKeys = Object.keys(rewardsByMonth).sort((a, b) => {
    const [ay, am] = a.split("-").map(Number);
    const [by, bm] = b.split("-").map(Number);
    return by - ay || bm - am;
  });

  const totalPoints = Object.values(rewardsByMonth).reduce(
    (acc, item) => acc + item.points,
    0
  );

  return (
    <SummaryContainer>
      <Title>Monthly Rewards Summary</Title>
      {sortedKeys.length === 0 ? (
        <p>No reward data available.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Month</Th>
              <Th>Year</Th>
              <Th>Points</Th>
            </tr>
          </thead>
          <tbody>
            {sortedKeys.map((key) => {
              const { month, year, points } = rewardsByMonth[key];
              return (
                <tr key={key}>
                  <Td>{month}</Td>
                  <Td>{year}</Td>
                  <Td>{Number(points.toFixed(1))}</Td>
                </tr>
              );
            })}
            <tr>
              <Td colSpan='2'>
                <strong>Total</strong>
              </Td>
              <Td>
                <strong>{Number(totalPoints.toFixed(1))}</strong>
              </Td>
            </tr>
          </tbody>
        </Table>
      )}
    </SummaryContainer>
  );
};

RewardsSummary.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      transactionId: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RewardsSummary;

const SummaryContainer = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  background: #fdfdfd;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
`;

const Th = styled.th`
  background-color: #f0f0f0;
  padding: 0.75rem;
  text-align: left;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-top: 1px solid #e0e0e0;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #444;
`;
