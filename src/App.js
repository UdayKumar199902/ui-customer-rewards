import React, { Fragment, Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import Filters from "./components/filters";
import { getRecentThreeMonths } from "./utils/dateUtils";
import { fetchTransactions } from "./api/getTransactions";

const LazyCustomerList = React.lazy(() => import("./components/customerList"));
const LazyErrorModal = React.lazy(() => import("./components/errorModal"));
const LazyRewardsSummary = React.lazy(() =>
  import("./components/rewardsSummary")
);
const LazyTransactionTable = React.lazy(() =>
  import("./components/transactionTable")
);

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [month, setMonth] = useState("recent");
  const [year, setYear] = useState("2025");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchTransactions();
      setTransactions(data);
      setYear("2025");
    } catch (err) {
      setError(err.message || "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    if (!selectedCustomerId) {
      setFilteredTransactions([]);
      return;
    }

    let filtered = transactions.filter(
      (txn) => txn.customerId === selectedCustomerId
    );

    if (month === "recent") {
      let recentMonths = getRecentThreeMonths();
      if (year) {
        recentMonths = recentMonths.filter((rm) => rm.year === parseInt(year));
      }

      filtered = filtered.filter((txn) => {
        const txnDate = new Date(txn.date);
        const txnMonth = txnDate.getMonth() + 1;
        const txnYear = txnDate.getFullYear();

        return recentMonths.some(
          (rm) => rm.month === txnMonth && rm.year === txnYear
        );
      });
    } else {
      filtered = filtered.filter((txn) => {
        const txnDate = new Date(txn.date);
        const txnMonth = txnDate.getMonth() + 1;
        const txnYear = txnDate.getFullYear();

        return (
          (!month || parseInt(month) === txnMonth) &&
          (!year || parseInt(year) === txnYear)
        );
      });
    }

    setFilteredTransactions(filtered);
  }, [transactions, selectedCustomerId, month, year]);

  const uniqueCustomerIds = [...new Set(transactions.map((t) => t.customerId))];

  return (
    <Container>
      {loading && <p>Loading transactions...</p>}
      {error && (
        <Suspense fallback={<p>Loading error modal...</p>}>
          <LazyErrorModal message={error} onRetry={loadTransactions} />
        </Suspense>
      )}

      {!loading && !error && (
        <Fragment>
          <Section>
            <Suspense fallback={<p>Loading customer list...</p>}>
              <LazyCustomerList
                customers={uniqueCustomerIds}
                selectedCustomerId={selectedCustomerId}
                onSelectCustomer={setSelectedCustomerId}
              />
            </Suspense>
          </Section>

          {selectedCustomerId && (
            <Fragment>
              <Section>
                <Suspense fallback={<p>Loading rewards summary...</p>}>
                  <LazyRewardsSummary
                    transactions={transactions.filter(
                      (t) => t.customerId === selectedCustomerId
                    )}
                  />
                </Suspense>
              </Section>

              <Section>
                <Filters
                  month={month}
                  year={year}
                  setMonth={setMonth}
                  setYear={setYear}
                />
              </Section>

              <Section>
                <Suspense fallback={<p>Loading transaction table...</p>}>
                  <LazyTransactionTable transactions={filteredTransactions} />
                </Suspense>
              </Section>
            </Fragment>
          )}
        </Fragment>
      )}
    </Container>
  );
}

export default App;

const Container = styled.div`
  max-width: 1200px;
  margin: 0.2rem auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;
