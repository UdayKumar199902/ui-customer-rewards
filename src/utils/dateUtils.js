
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getRecentThreeMonths = () => {
  const today = new Date();
  const months = [];

  for (let i = 0; i < 3; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    months.push({
      month: d.getMonth() + 1,
      year: d.getFullYear(),
    });
  }

  return months;
};


