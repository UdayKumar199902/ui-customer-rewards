export const calculateRewardPoints = (amount) => {
  let points = 0;
  if (amount > 100) points += (amount - 100) * 2 + 50;
  else if (amount > 50) points += amount - 50;
  console.log(points, "points123456");
  return points;
};

export const getMonthYear = (dateStr) => {
  const date = new Date(dateStr);
  return {
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    label: date.toLocaleString("default", { month: "long" }),
  };
};
