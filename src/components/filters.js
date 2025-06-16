import PropTypes from "prop-types";
import styled from "styled-components";

const Filters = ({ month, year, setMonth, setYear }) => {
  const months = [
    { label: "Recent 3 Months", value: "recent" },
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];

  const yearOptions = [2025, 2024, 2023];

  return (
    <FiltersContainer>
      <Label>
        Month:{" "}
        <Select
          value={month || "recent"}
          onChange={(e) => setMonth(e.target.value)}
        >
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </Select>
      </Label>

      <Label>
        Year:{" "}
        <Select value={year} onChange={(e) => setYear(e.target.value)}>
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>
      </Label>
    </FiltersContainer>
  );
};

Filters.propTypes = {
  month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setMonth: PropTypes.func.isRequired,
  setYear: PropTypes.func.isRequired,
};

export default Filters;

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1.5rem 0;
`;

const Label = styled.label`
  font-weight: 500;
  color: #222;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  min-width: 160px;
`;
