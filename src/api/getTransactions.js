import { transactions } from "../data/mockTransactions";
import { getRecentThreeMonths } from "../utils/dateUtils";

const API_DELAY = 1500;
const ERROR_RATE = 0.1;

const getMonthYear = (dateStr) => {
  const date = new Date(dateStr);
  return {
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
};

export const fetchTransactions = async (filters = { month: "recent" }) => {
  const success = Math.random() > ERROR_RATE;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!success) {
        // console.error("[API] fetch error.");
        reject(new Error("Failed to fetch transactions. Please try again."));
        return;
      }

      let filtered = [...transactions];

      if (filters.customerId) {
        filtered = filtered.filter(
          (txn) => txn.customerId === filters.customerId
        );
      }

      if (filters.month === "recent") {
        const recentMonths = getRecentThreeMonths();
        filtered = filtered.filter((txn) => {
          const { month, year } = getMonthYear(txn.date);
          return recentMonths.some(
            (rm) => rm.month === month && rm.year === year
          );
        });
      } else if (filters.month || filters.year) {
        filtered = filtered.filter((txn) => {
          const { month, year } = getMonthYear(txn.date);
          return (
            (!filters.month || parseInt(filters.month) === month) &&
            (!filters.year || parseInt(filters.year) === year)
          );
        });
      }

      resolve(filtered);
    }, API_DELAY);
  });
};
